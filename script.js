sketchBoard = document.querySelector(".container");

function createGrid(numberOfTiles) {
  for (let rowI = 0; rowI < numberOfTiles; rowI++) {
    tileRow = []
    for (let colI = 0; colI < numberOfTiles; colI++) {
      tile = document.createElement("div")
      tile.classList.add("tile", `row${rowI}`, `col${colI}`)
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


setBoardSize();
createGrid(16);

window.addEventListener("resize", setBoardSize)
