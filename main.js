// Pre-amble-ish stuff
var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

var color = d3.scaleOrdinal(d3.schemeCategory20);

var csvfile = "data/2014.csv";
var arr = new Array(); // Array to hold data

// Import data
d3.csv("data/2014.csv", function(data) {
  arr[2014]= data // Hold data for year i in arr[i]
  console.log(arr)
})
