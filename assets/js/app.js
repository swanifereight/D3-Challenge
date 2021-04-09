// @TODO: YOUR CODE HERE!
var width = parseInt(d3.select("#scatter").style("width"));
var height = width - width / 4.0;
var margin = 20;
var label = 110;
var tPadBot = 40;
var tPadLeft = 40;


var svg = d3
.select("#scatter")
.append("svg")
.attr("width", width)
.attr("height", height)
.attr("class", "chart");

var circle;
function crGet() {
	if (width <= 530) {
		circle = 5;
	}
	else{
		circle = 10;
	}
}
crGet();

svg.append("g").attr("class", "xText");
var xText = d3.select("xText");
function xTextRefresh() {
	xText.attr(
		"transform",
		"translate(" +
		((width - label) / 2 + label) +
		"," +
		(height - margin - tPadBot) +
		")"
		);
}
xTextRefresh();