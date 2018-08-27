const sketchBoard = document.querySelector(".container");
const resetButton = document.querySelector("button.reset");
const resizeButton = document.querySelector("button.resize");
const resizeInput = document.querySelector("input.resize");
const paintButtonSolid = document.querySelector("button.solid");
const paintButtonGradual = document.querySelector("button.gradual");
const precisionButton = document.querySelector("button.accuracy");

let paintModeSolid = true;
let paintPrecision = false;

function createGrid(numberOfTiles) {
  sketchBoard.innerHTML = ""
  for (let rowI = 0; rowI < numberOfTiles; rowI++) {
    let tileRow = []
    for (let colI = 0; colI < numberOfTiles; colI++) {
      tile = document.createElement("div")
      tile.classList.add("tile")
      if (paintPrecision) tile.classList.add("precise");
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
    if (paintModeSolid) {
      e.target.style = ""
      e.target.classList.add("painted");
    } else if (paintModeSolid === false) {
      let background = window.getComputedStyle(e.target).getPropertyValue("background-color");
      e.target.style.backgroundColor = rgbIncrement(background)

      let border = window.getComputedStyle(e.target).getPropertyValue("border-bottom-color");
      e.target.style.borderColor = rgbIncrement(border)
    }
  }
}
function rgbIncrement(rgbString) {
  let rgb = rgbString.split(/[,()]/);
  if (rgb[0] === "rgb") {
    console.log("return");
    return false;
  }
  let alpha = Number(rgb[4]) + 0.1
  rgb[4] = alpha;
  return `rgba(${rgb[1]},${rgb[2]},${rgb[3]},${rgb[4]})`
}

function resetGrid() {
  let confirmation = confirm("You are about to delete your work\n Are you sure this is OK?")
  if (confirmation) {
    let tiles = [...document.querySelectorAll(".tile")];
    tiles.forEach(tile => {
      tile.classList.remove("painted");
      tile.style = "";
    });
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
function handleResize(e) {if (e.key === "Enter") resizeGrid()}

function togglePaintMode(e) {
  if (e.target.classList.contains("selected")) return;
  if (e.target.classList.contains("solid")) {
    paintModeSolid = true;
    paintButtonGradual.classList.remove("selected")
    e.target.classList.add("selected")
  } else if (e.target.classList.contains("gradual")) {
    paintModeSolid = false;
    paintButtonSolid.classList.remove("selected")
    e.target.classList.add("selected")
  }
}

function togglePaintPrecision() {
  tiles = [...document.querySelectorAll(".tile")]
  if (paintPrecision) {
    paintPrecision = false;
    sketchBoard.classList.remove("precise");
    precisionButton.innerHTML = "Increase<br>Painting Precision"
    tiles.forEach(tile => tile.classList.remove("precise"));
  } else {
    paintPrecision = true;
    sketchBoard.classList.add("precise");
    precisionButton.innerHTML = "More Aesthetic<br>Grid Look"
    tiles.forEach(tile => tile.classList.add("precise"));
  }
}

setBoardSize();
createGrid(20);

window.addEventListener("resize", setBoardSize);
sketchBoard.addEventListener("mouseover", paintTiles);
resetButton.addEventListener("click", resetGrid);
resizeButton.addEventListener("click", resizeGrid);
resizeInput.addEventListener("keypress", handleResize);
paintButtonSolid.addEventListener("click", togglePaintMode);
paintButtonGradual.addEventListener("click", togglePaintMode);

precisionButton.addEventListener("click", togglePaintPrecision);
