let cols, rows;
const w = 20;
let grid = [];
let current;

var getIndex = function(c, r) {
	if (c < 0 || r < 0 || c >= cols || r >= rows) return -1;
	return c * cols + r;
}

function setup() {
	createCanvas(601, 601);
	cols = floor(width / w);
	rows = floor(height / w);
	frameRate(10);

	for(var c = 0; c < cols; c++) {
		for(var r = 0; r< rows; r++) {
			var cell = new Cell(c, r);
			grid.push(cell);
		}
	}
	current = grid[0];
}

function draw() {
	background(51);
	for(var i = 0; i < grid.length; i++) {
		grid[i].show();
	}
	current.visited = true;
	var next = current.checkNeighbors();
	if (next) {
		next.visited = true;
		if (next.row < current.row) {
			next.walls[2] = false;
			current.walls[0] = false;
		} else if (next.col > current.col) {
			next.walls[3] = false;
			current.walls[1] = false;
		} else if (next.row > current.row) {
			next.walls[0] = false;
			current.walls[2] = false;
		} else if (next.col < current.col) {
			next.walls[1] = false;
			current.walls[3] = false;
		}
		current = next;
		current.highlight();
	}
}

function Cell(col, row) {
	this.col = col;
	this.row = row;
	this.walls = [true, true, true, true];
	this.visited = false;

	this.checkNeighbors = function() {
		var neighbors = [];
		var top    = grid[getIndex(this.col, this.row - 1)];
		var right  = grid[getIndex(this.col + 1, this.row)];
		var bottom = grid[getIndex(this.col, this.row + 1)];
		var left   = grid[getIndex(this.col - 1, this.row)];

		if (top && !top.visited) { neighbors.push(top); }
		if (right && !right.visited) { neighbors.push(right); }
		if (bottom && !bottom.visited) { neighbors.push(bottom); }
		if (left && !left.visited) { neighbors.push(left); }

		if (neighbors.length > 0) {
			return neighbors[floor(random() * neighbors.length)];
		} else {
			return undefined;
		}
	}

	this.show = () => {
		var x = this.col * w;
		var y = this.row * w;
		stroke(0,255,255);

		if (this.walls[0]) { line(x,y,x+w,y); }
		if (this.walls[1]) { line(x+w,y,x+w,y+w); }
		if (this.walls[2]) { line(x+w,y+w,x,y+w); }
		if (this.walls[3]) { line(x,y+w,x,y); }

		if (this.visited) {
			fill(0,255,255,110);
			noStroke();
			rect(x,y,w,w);
		}

		// noFill();
		// rect(x, y, w, w);
		this.highlight = () => {
			var x = this.col * w;
			var y = this.row * w;
			noStroke();
			fill(255,191,0);
			rect(x,y,w,w);
		}
	}

}
