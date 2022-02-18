const grid = document.getElementById('grid');

const gridSize = document.getElementById('grid-size');
const pickedColor = document.getElementById('color');

gridSize.addEventListener('change', (e)=>{
  destroyGrid();
  if (e.target.value < e.target.min) {
    e.target.value = '1';
  } else if (+e.target.value > +e.target.max) {
    e.target.value = '50';
  }
  createGrid(e.target.value);
});


createGrid(gridSize.value);


function destroyGrid() {
  grid.innerHTML = '';
}

function createGrid(cellPerSide) {
  cellSize = parseInt(getComputedStyle(grid).width) / cellPerSide;
  for (i = 0; i < cellPerSide; i++) {
    for (j = 0; j < cellPerSide; j++) {
      cell = createCell(cellSize);
      cell.addEventListener('mouseover',paintCellRand)
      grid.appendChild(cell);
    }
  }
}

function createCell(cellSize) {
  cell = document.createElement('div');
  cell.style.width = `${cellSize}px`;
  cell.style.height = `${cellSize}px`;
  cell.style.borderWidth = `${cellSize / 100000}px`
  cell.classList.add('cell');
  return cell;
}

function paintCellRand(e) {
  let color = '#' + Math.floor((16**6*Math.random())).toString(16);
  e.target.style.backgroundColor = color;
}