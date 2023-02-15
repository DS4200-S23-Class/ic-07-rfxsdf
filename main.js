const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
const MARGINS = {left:80, right:50, top:50, bottom:50};

const data1 = [55000, 48000, 27000, 66000, 90000];

const VIS_HEIGHT = FRAME_HEIGHT - (MARGINS.top + MARGINS.bottom);
const VIS_WIDTH = FRAME_WIDTH - (MARGINS.left + MARGINS.right);

const FRAME3 = d3.select("#vis1")
					.append("svg")
						.attr("height", FRAME_HEIGHT)
						.attr("width", FRAME_WIDTH)
						.attr("class", "frame");

// Scaling functions
const MAX_Y = d3.max(data1, (d) => {return d;});
console.log("Max x: " + MAX_Y);

// scale function 
const Y_SCALE = d3.scaleLinear()
					.domain([(MAX_Y + 10000), 0]) // 10000 - buffer
					.range([VIS_HEIGHT, 0]);
					

FRAME3.selectAll("points")
		.data(data1)
		.enter()
		.append("circle")
			.attr("cx", MARGINS.left+50)
			.attr("cy", (d) => {
				return (Y_SCALE(d) + MARGINS.top);
			})
			.attr("r", 10)
			.attr("class", "point");

// add an axis
FRAME3.append("g")
		.attr("transform", 
			"translate(" + MARGINS.left + "," + (MARGINS.bottom + ")"))
		.call(d3.axisLeft(Y_SCALE).ticks(5))
			.attr("font-size", "20px");
