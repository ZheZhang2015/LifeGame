/**
A 2 dimensional array of cells
*/
function Grid( cellsPerRow, cellsPerColumn ){
	var _cells = [];
	var _totalCells = cellsPerRow * cellsPerColumn;

	//Create the cells
	for (var i = 0; i < _totalCells; ++i) {
		var x = i % cellsPerRow;
		var y = Math.floor( i / cellsPerRow );
		_cells.push( new Cell( x, y ) );
	}

	/**
	Get the cell at the provided index
	*/
	this.getCellByIndex = function (index) { return _cells[index]; }


	/** step 7 */
	/** Get all living cells next to the provided index */
	this.getLiveNeighbours = function(cellIndex) {
		var liveNeighbours = 0;
		var cell = _cells[cellIndex];

		var startX = Math.max(cell.x - 1, 0);
		var startY = Math.max(cell.y - 1, 0);
		var endX = Math.min(cell.x + 1, cellsPerRow - 1);
		var endY = Math.min(cell.y + 1, cellsPerColumn - 1);
		
		for (var x = startX; x <= endX; ++x) {
			for (var y = startY; y <= endY; ++y) {
			
				//Ignore the cell being considered
				if (x == cell.x && y == cell.y) {
					continue;
				}

				var cellIndex = x + y * cellsPerRow;
				if (_cells[cellIndex].live) {
					liveNeighbours++;
				}
				
			}
		}
	
		return liveNeighbours;
	}


	/** step 10 */
	/** Collect all dead cells */
	this.getDeadCells = function() {
		var deadCells = [];
		for(var i = 0; i < _totalCells; ++i) {
			if (!_cells[i].live) {
				deadCells.push(_cells[i]);
			}
		}
		return deadCells;
	}


}

