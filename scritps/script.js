let counter = 0;
const refButton = document.querySelector("#add").addEventListener("click", () => {
  document.querySelector(".note_image").style.display = 'none';
});

function createBox(idNumber) {
  return `<div onclick="openBox(this)" id=${idNumber} class="note_boxes">
            <textarea oninput="saveNotes(this)" type="text" placeholder="Your Notes here..."></textarea>
            <img onclick="stopEventBubbel(event); deleteBox(event)" class="trash" src="./assets/icons/icons8-trash-96.png" alt="trash">
          </div>`;
}

function addBox() {
  let refBoxSection = document.querySelector(".note_box_section");
  refBoxSection.innerHTML += createBox(counter++);
  sortKeys();
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
  sortKeys();
  localStorage.clear();
  saveToLocalStorage();
}

function sortKeys() {
  let refElement = document.querySelectorAll(".note_boxes");

  for (let i = 0; i < refElement.length; i++) {
    const element = refElement[i];
    element.id = i;
    counter = element.id;
  }
}

function saveToLocalStorage() {
  let noteBoxes = document.querySelectorAll(".note_boxes");

  for (let index = 0; index < noteBoxes.length; index++) {
    let noteBoxesSerialized = JSON.stringify(noteBoxes[index].outerHTML);
    localStorage.setItem(index, noteBoxesSerialized);
   
  }
}

function loadFromLocalStorage() {
  let sectionToLoad = document.querySelector(".note_box_section");

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let boxContent = localStorage.getItem(key);
    sectionToLoad.innerHTML += JSON.parse(boxContent);
  }
  sortKeys();
}

function removeBoxesFromLocalStorage(event) {
  const getKey = event.target;
  localStorage.removeItem(parseInt(getKey.parentNode.id));
}

function saveNotes(event) {
  
  event.innerHTML = event.value;
  saveToLocalStorage()
}

function hideImage() {

  if (localStorage.length > 0) {
    document.querySelector(".note_image").style.display = 'none'; 
  }
}

