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

createGrid(16);
