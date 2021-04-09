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

xText
  .append("text")
  .attr("y", -26)
  .attr("data-name", "poverty")
  .attr("data-axis", "x")
  .attr("class", "aText active x")
  .text("In Poverty (%)");

  xText
  .append("text")
  .attr("y", 0)
  .attr("data-name", "age")
  .attr("data-axis", "x")
  .attr("class", "aText inactive x")
  .text("Age (Median)");

  xText
  .append("text")
  .attr("y", 26)
  .attr("data-name", "income")
  .attr("data-axis", "x")
  .attr("class", "aText inactive x")
  .text("Household income (Median)");


var leftTextX = margin + tPadLeft;
var leftTextY = (height + label) / 2 - label;
svg.append("g").attr("class", "yText");
var yText = d3.select(".yText");

function yTextRefresh(){
	yText.attr(
		"transform",
		"translate(" + leftTextX + "," + leftTextY + ")rotate(-90)");
}
yTextRefresh();




















