const grid = document.getElementById('grid');

const gridSize = document.getElementById('grid-size');
const pickedColor = document.getElementById('color');
const rainbowMode = document.getElementById('rainbow-mode');

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
      cell.addEventListener('mouseover',paintCell);
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

function paintCell(e) {
  let color;
  if(rainbowMode.checked) {
    color = '#' + Math.floor((16**6*Math.random())).toString(16);
  } else {
    color = pickedColor.value;
  }
  e.target.style.backgroundColor = color;
}