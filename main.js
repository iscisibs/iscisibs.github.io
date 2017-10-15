function myFunction() {

  // Clear the lists
  $("#bigSibList").empty();
  $("#littleSibList").empty();

  // Grab what was searched
  var searchArg = $("#searchbar").val();

  // Deal with it
  d3.json("https://iscisibs.github.io/fullData.json", function(data){

    // Record JSON elements with search argument as the "name"
    var bigSibs = data.filter(function(d) {
     return d.name == searchArg;
   });

   // Record JSON elements with search argument as the "bigsib"
    var littleSibs = data.filter(function(d) {
      return d.bigsib == searchArg;
    });

    //Output the big sib data
     d3.select("#bigSibList")
        .selectAll("li")
        .data(bigSibs)
        .enter()
        .append("li").text(function(d) {return d.bigsib});

    // Output the little sib data
      d3.select("#littleSibList")
         .selectAll("li")
         .data(littleSibs)
         .enter()
         .append("li").text(function(d) {return d.name})
   });


}
