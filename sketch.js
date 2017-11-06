let cols, rows;
const w = 40;
let grid = [];

function setup() {
	createCanvas(401, 401);
	cols = floor(width / w);
	rows = floor(height / w);

	for(var c = 0; c < cols; c++) {
		for(var r = 0; r< rows; r++) {
			var cell = new Cell(c, r);
			grid.push(cell);
		}
	}
}

function draw() {
	background(51);
	for(var i = 0; i < grid.length; i++) {
		grid[i].show();
	}
}

function Cell(col, row) {
	this.col = col;
	this.row = row;
	this.walls = [true, true, true, true];

	this.show = () => {
		var x = this.col * w;
		var y = this.row * w;
		stroke(0,255,255);

		if(this.walls[0]) { line(x,y,x+w,y); }
		if(this.walls[1]) { line(x+w,y,x+w,y+w); }
		if(this.walls[2]) { line(x+w,y+w,x,y+w); }
		if(this.walls[3]) { line(x,y+w,x,y); }


		// noFill();
		// rect(x, y, w, w);
	};
}
