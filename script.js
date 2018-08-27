const sketchBoard = document.querySelector(".container");
const resetButton = document.querySelector(".reset")
const resizeButton = document.querySelector("button.resize")
const resizeInput = document.querySelector("input.resize")

function createGrid(numberOfTiles) {
  sketchBoard.innerHTML = ""
  for (let rowI = 0; rowI < numberOfTiles; rowI++) {
    let tileRow = []
    for (let colI = 0; colI < numberOfTiles; colI++) {
      tile = document.createElement("div")
      tile.classList.add("tile")
      tileRow.push(tile);
    }
    tileRow.forEach(tile => sketchBoard.appendChild(tile));
  }
  styleGrid(numberOfTiles);
}

function styleGrid(gridSize) {
  sketchBoard.style.gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`
}

function setBoardSize() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  if (width > height) {
    sketchBoard.style.width = `${height}px`;
    sketchBoard.style.height = `${height}px`;
  } else if (height > width) {
    sketchBoard.style.height = `${width}px`;
    sketchBoard.style.width = `${width}px`;
  }
}

function paintTiles(e) {
  if (e.target.classList.contains("tile")) {
    e.target.classList.add("painted");
  }
}

function resetGrid() {
  let confirmation = confirm("You are about to delete your work\n Are you sure this is OK?")
  if (confirmation) {
    let tiles = [...document.querySelectorAll(".tile")];
    tiles.forEach(tile => tile.classList.remove("painted"));
  }
}

function resizeGrid() {
  let newSize = Number(resizeInput.value);
  if (!(newSize >= 8 && newSize <= 64)) {
    alert("That is not a valid input\nEnter a number between 8 - 64");
    return;
  }
  createGrid(newSize);
  resizeInput.value = "";
}

setBoardSize();
createGrid(20);

window.addEventListener("resize", setBoardSize);
sketchBoard.addEventListener("mouseover", paintTiles);
resetButton.addEventListener("click", resetGrid);
resizeButton.addEventListener("click", resizeGrid)
