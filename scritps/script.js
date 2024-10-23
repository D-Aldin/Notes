let counter = 0;

function createBox(id_number) {
  return `<div onclick="openBox(this)" id=${id_number} class="note_boxes">
            <textarea oninput="saveNotes(this)" type="text" placeholder="Your Notes here..."></textarea>
            <img onclick="stopEventBubbel(event); deleteBox(event)" class="trash" src="./assets/icons/icons8-trash-96.png" alt="trash">
          </div>`;
}

function addBox() {
  let refBoxSection = document.querySelector(".note_box_section");
  refBoxSection.innerHTML += createBox(counter++);

  saveBoxes();
}

function openBox(event) {
  let refClicketBox = document.getElementById(event.id);
  let getElement = document.getElementById(refClicketBox.id);
  getElement.classList.toggle("open_box");
}

function stopEventBubbel(event) {
  event.stopPropagation();
}

function deleteBox(event) {
  const box = event.target;
  box.parentNode.remove();
  removeNotesFromLocalStorage(event);
}

function saveBoxes() {
  let noteBoxes = document.querySelectorAll(".note_boxes"); // Get all the DIV´s with the class note_boxes

  for (let index = 0; index < noteBoxes.length; index++) {
    // Iterate over the NodeList´s
    const element = noteBoxes[index];
    let noteBoxesSerialized = JSON.stringify(element.outerHTML); // Convert the content to strings
    localStorage.setItem(element.id, noteBoxesSerialized); // Save it in the localStorage
  }
}

function loadBoxes() {
  let sectionToLoad = document.querySelector(".note_box_section");

  // Iterate through all keys in localStorage
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let boxContent = localStorage.getItem(key);
    
    if (boxContent) {  // Ensure there is content before adding
      sectionToLoad.innerHTML += JSON.parse(boxContent);
      counter = Math.max(counter, parseInt(key) + 1); // Update counter to avoid duplicate IDs
      saveNotes()
    }
  }
}


function saveNotes(event) {
  event.innerHTML = event.value;
}

function removeNotesFromLocalStorage(event) {
  const getKey = event.target;
  console.log(getKey.parentNode.id);
  
  localStorage.removeItem(parseInt(getKey.parentNode.id));
}

function sortKeys() {
  for (let i = 0; i < localStorage.length; i++) {
    let oldKey = localStorage.key(i);
    let newKey = String(i);
    let value = localStorage.getItem(oldKey);
    localStorage.setItem(newKey, value);
    // localStorage.removeItem(oldKey);
  }
}
