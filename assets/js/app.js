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

var circleRad;
function crGet() {
	if (width <= 530) {
		circleRad = 5;
	}
	else{
		circleRad = 10;
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

yText
  .append("text")
  .attr("y", -26)
  .attr("data-name", "obesity")
  .attr("data-axis", "y")
  .attr("class", "aText active y")
  .text("Obese (%)");

  yText
  .append("text")
  .attr("x", 0)
  .attr("data-name", "smokes")
  .attr("data-axis", "y")
  .attr("class", "aText inactive y")
  .text("Smokes (%)");

  yText
  .append("text")
  .attr("y", 26)
  .attr("data-name", "healthcare")
  .attr("data-axis", "y")
  .attr("class", "aText inactive y")
  .text("Lacks Healthcare (%)");

d3.csv("assets/data/data.csv").then(function(data){
	visualize(data);
});


function visualize(theData) {
	var circX = "poverty";
	var circY = "obesity";


var Xmin;
var Xmax;
var Ymin;
var Ymax;


var toolTip = d3
.tip()
.attr("class", "d3-tip")
.offset([40, -60])
.html(function(d) {
	var Xkey;
	var state = "<div>" + d.state + "</div>";
	var Ykey = "<div>" + circY + ": " + d[circY] + "%</div>";
	if (circX ==="poverty") {
		Xkey = "<div>" + circX + ":" + d[circX] + "%</div>";
	}
	else{ 
		Xkey = "<div>" +
		circX +
		":" +
		parseFloat(d[circX]).toLocaleString("en")+
		"</div>";

	}
	return state + Xkey + Ykey;
});
svg.call(toolTip);

function XminMax() {
	Xmin = d3.min(theData, function(d){
		return parseFloat(d[circX]) * .90;
	});

	Xmax = d3.max(theData, function(d){
		return parseFloat(d[circX]) * 1.10;
	});
}

function YminMax() {
	Ymin = d3.min(theData, function(d){
		return parseFloat(d[circY]) * .90;
	});

	Ymax = d3.max(theData, function(d){
		return parseFloat(d[circY]) * 1.10;
	});
}
function labelChange(axis, clickedText) {
	d3
	.selectAll(".aText")
	.filter("." + axis)
	.filter(".active")
	.classed("active", false)
	.classed("inactive", true);
	clickedText.classed("inactive", false).classed("active", true);
}

XminMax();
YminMax();

var Xscale = d3
.scaleLinear()
.domain([Xmin,Xmax])
.range([margin + label, width - margin]);

var Yscale = d3
.scaleLinear()
.domain([Ymin,Ymax])
.range([ height - margin - label, margin]);

var Xaxis=d3.axisBottom(Xscale);
var Yaxis=d3.axisLeft(Yscale);

function tickCount(){
	if (width <= 500) {
		Xaxis.ticks(5);
		Yaxis.ticks(5);
	}
	else {
		Xaxis.ticks(10);
		Yaxis.ticks(10);

	}
}
tickCount();

svg
.append("g")
.call(Xaxis)
.attr("class", "Xaxis")
.attr("transform", "translate(0," + (height - margin - label) + ")");

svg
.append("g")
.call(Yaxis)
.attr("class", "Yaxis")
.attr("transform", "translate(" + (margin +label) + ",0)");

var Circles = svg.selectAll("g Circles").data(theData).enter();
Circles
.append("circle")
.attr("cx", function(d){
	return Xscale(d[circX]);
})
.attr("cy", function(d){
	return Yscale(d[circY]);
})
.attr("r", circleRad)
.attr("class", function(d) {
	return "stateCircle" + d.abbr;
})
.on("mouseover", function(d) {
	toolTip.show(d, this);
	d3.select(this).style("stroke", "blue");
})
.on("mouseout", function(d){
	toolTip.hide(d);
	d3.select(this).style("stroke", "#e3e3e3");
});

Circles
.append("text")
.text(function(d) {
    return d.abbr;
    })
.attr("dx", function(d) {
    return Xscale(d[circX]);
    })
.attr("dy", function(d) {
     return Yscale(d[circY]) + circleRad / 2.5;
    })
.attr("font-size", circleRad)
.attr("class", "stateText")
.on("mouseover", function(d) {
 toolTip.show(d);

d3.select("." + d.abbr).style("stroke", "blue");
    })
.on("mouseout", function(d) {

toolTip.hide(d);

d3.select("." + d.abbr).style("stroke", "#e3e3e3");
    });

d3.selectAll(".aText").on("click", function() {
	var self = d3.select(this);
	if (self.classed("inactive")){
		var axis = self.attr("data-axis");
		var name = self.attr("data-name");
		if (axis === "x") {
			circX = name;
			XminMax();
			Xscale.domain([Xmin, Xmax ]);
			svg.select(".Xaxis").transition().duration(300).call(Xaxis);
			
			d3.selectAll("circle").each(function(){
				d3
				.select(this)
				.transition()
				.attr("cx", function(d) {
					return Xscale(d[circX]);
				})
				.duration(300);
			});
			d3.selectAll(".stateText").each(function() {
				d3
				.select(this)
				.transition()
				.attr("dx", function(d) {
					return Xscale(d[circX]);
				})
				.duration(300);

			});
			labelChange(axis,self);
		}
		else{
			circY = name;
			YminMax();
			Yscale.domain([Ymin, Ymax]);
			svg.select(".Yaxis").transition().duration(300).call(Yaxis);
			d3.selectAll("circle").each(function() {
				d3
				.select(this)
				.transition()
				.attr("cy", function(d){
					return Yscale(d[circY]);
				})
				.duration(300);
			});
			d3.selectAll(".stateText").each(function() {
				d3
				.select(this)
				.transition()
				.attr("dy", function(d){
					return Yscale(d[circY]);
				})
				.duration(300);
			});
			labelChange(axis,self)

		}
	}
});


}
















