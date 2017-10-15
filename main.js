function myFunction() {

  // Clear the lists
  $("#bigSibList").empty();
  $("#littleSibList").empty();

  // Grab what was searched
  var searchArg = $("#searchbar").val();

  // Deal with it
  d3.json("https://iscisibs.github.io/fullData.json", function(data) {
    var bigSibs = data.filter(function(d) {
     return d.name == searchArg;
   });
    var littleSibs = data.filter(function(d) {
      return d.bigsib == searchArg;
    });

     d3.select("#bigSibList")
        .selectAll("li")
        .data(bigSibs)
        .enter()
        .append("li").text(function(d) {return d.bigsib});

      d3.select("#littleSibList")
         .selectAll("li")
         .data(littleSibs)
         .enter()
         .append("li").text(function(d) {return d.name})
   });


}
