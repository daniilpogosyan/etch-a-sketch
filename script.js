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
      cell.addEventListener('mouseover',paintCell);
      cell.style.backgroundColor = '#ffffff';
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
  getColor = e => {
    mode = document.querySelector('input[name="mode"]:checked');
    console.info(mode.id);
    switch (mode.id) {
      case 'default-mode':
        return pickedColor.value;
      case 'watercolor-mode':
        let cellRGB = e.target.style.backgroundColor;
        cellColors = [...cellRGB.matchAll(/\d+/g)];
      
        let newStrokeHex = pickedColor.value;
        let strokeRedCh = parseInt(newStrokeHex.slice(1,3),16);
        let strokeGreenCh = parseInt(newStrokeHex.slice(3,5),16);
        let strokeBlueCh = parseInt(newStrokeHex.slice(5),16);
      
        let strokePart = 0.2;
        let newRedCh = Math.floor(cellColors[0] * (1 - strokePart) + strokeRedCh * strokePart);
        let newGreenCh = Math.floor(cellColors[1] * (1 - strokePart) + strokeGreenCh * strokePart);
        let newBlueCh = Math.floor(cellColors[2] * (1 - strokePart) + strokeBlueCh * strokePart);

        let newColor = `rgb(${newRedCh}, ${newGreenCh}, ${newBlueCh})`;
        e.target.style.backgroundColor = newColor;
        return newColor;
   
      case 'rainbow-mode':
        return `rgb(${Math.round(Math.random()*255)}, ${Math.round(Math.random()*255)}, ${Math.round(Math.random()*255)})`;
      default:
        console.log('none of modes');
    }
  }
  e.target.style.backgroundColor = getColor(e);
}