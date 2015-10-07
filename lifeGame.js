
function LifeGame(width, height, cellSize, canvas) { 
	//Private
	var _cellsPerRow = width / cellSize;
	var _cellsPerColumn = height / cellSize;
	var _totalCells = _cellsPerRow * _cellsPerColumn;
	var _ctx = canvas.getContext('2d');
	var _grid = new Grid(_cellsPerRow, _cellsPerColumn);

	this.clear = function () {
		_grid = new Grid(_cellsPerRow, _cellsPerColumn);
	}


	/** Draw the current grid */
	this.draw = function () {
		//Clear the background
		_ctx.clearRect(0, 0, _ctx.canvas.width, _ctx.canvas.height);
		_ctx.lineWidth = 1;
		_ctx.strokeStyle = "#ccc";

		//Draw the cells
		for (var i = 0; i < _totalCells; ++i) {
			var cell = _grid.getCellByIndex(i);

			if (cell.live) {
				_ctx.fillStyle = "black";//draw black
			}else{
				_ctx.fillStyle = "white";//draw white
			}

			//Render the cell 
			_ctx.beginPath();

			_ctx.rect(
				cell.x * cellSize, //X location of top left
				cell.y * cellSize, //Y location of top left 
				cellSize, //width
				cellSize //height
			); 
			_ctx.fill();
			_ctx.stroke();
		}
	}

	/** step 8 */
	/** Advance the game a generation */
	var _this = this;
	
	this.update = function () {
		//create a new grid based on the old one
		var nextGeneration = new Grid(_cellsPerRow, _cellsPerColumn);

		//Apply the rules to all members of the current generation
		for (var i = 0; i < _totalCells; ++i) {
			var oldCell = _grid.getCellByIndex(i);
			var newCell = nextGeneration.getCellByIndex(i);
			var neighbours = _grid.getLiveNeighbours(i);

			//Apply living rules
			if (oldCell.live) {
				//Cells die unless they have exactly 2 or 3 neighbors
				newCell.live = neighbours > 1 && neighbours < 4; 
			} else {
				//Check if this cell should come to life
				if (neighbours == 3) {
					newCell.live = true;
				}
			}
		}
		//Replace the old generation with the new one 
		_grid = nextGeneration;
		_this.draw();
	}


	/** Make the provided number of cells come to life */
	this.addRandomCells = function(count) {
		var deadCells = _grid.getDeadCells();
		
		for(var i = 0; i < count && deadCells.length > 0; ++i) {
			var randomIndex = Math.floor( Math.random() * deadCells.length );
			deadCells[randomIndex].live = true;
			deadCells.splice(randomIndex, 1);
		}
	}
	
	this.addCell = function(x,y){
		var index = (y * _cellsPerRow )+ x;
		_grid.getCellByIndex(index).live = true;
	}

}


	







