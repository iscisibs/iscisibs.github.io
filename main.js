function executeSearch(searchArg) {
  // Deal with it
  d3.json("https://iscisibs.github.io/fullData.json", function(data){

    // Record JSON elements with search argument as the "name"
    var bigSibs = data.filter(function(d) {
     return d.namekey == searchArg;
   });

   // Record JSON elements with search argument as the "bigsib"
    var littleSibs = data.filter(function(d) {
      return d.bigsibkey == searchArg;
    });

    //Output the big sib data
     d3.select("#bigSibList")
        .selectAll("li")
        .data(bigSibs)
        .enter()
        .append("a")
        .attr('class', 'list-group-item list-group-item-action list-element')
        .text(function(d) {return d.bigsib});

    // Output the little sib data
      d3.select("#littleSibList")
         .selectAll("li")
         .data(littleSibs)
         .enter()
         .append("a")
         .attr('class', 'list-group-item list-group-item-action list-element')
         .text(function(d) {return d.name});

      d3.select("#yearHeader")
        .data(bigSibs)
        .text(function(d) {return d.year})

      d3.select("#nameHeader")
        .data(bigSibs)
        .text(function(d) {return d.name})

   });
};

function searchText() {

  // Clear the lists
  $("#bigSibList").empty();
  $("#littleSibList").empty();

  // Grab what was searched
  var searchInput = $("#searchbar")
    .val()
    .replace(/\s+/g, '')
    .toLowerCase();

  executeSearch(searchInput);
};
