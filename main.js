function executeSearch(searchArg) {
  // Deal with it
  d3.json("https://iscisibs.github.io/fullData.json", function(data) {

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
      .selectAll("a")
      .data(bigSibs)
      .enter()
      .append("a")
      .attr("class", 'list-group-item list-group-item-action list-element')
      .attr("id", function(d) {
          return d.bigsibkey
      })
      .attr("onclick", "searchClick(this.id)")
      .text(function(d) {
        if (d.bigsib != "NA NA") {
          return d.bigsib
        }
      });

    // Output the little sib data
    d3.select("#littleSibList")
      .selectAll("a")
      .data(littleSibs)
      .enter()
      .append("a")
      .attr("class", 'list-group-item list-group-item-action list-element')
      .attr("id", function(d) {
        return d.namekey
      })
      .attr("onclick", "searchClick(this.id)")
      .text(function(d) {
        return d.name
      });

    d3.select("#yearHeader")
      .data(bigSibs)
      .text(function(d) {
        return d.year
      })

    d3.select("#nameHeader")
      .data(bigSibs)
      .attr("onclick", "makeInteractive()")
      .text(function(d) {
        return d.name
      })
  });


};

function searchText() {
  // Clear the lists
  $("#nameHeader").text("...")
  $("#yearHeader").text("...")
  $("#bigSibList").empty();
  $("#littleSibList").empty();

  // Grab what was searched
  var searchInput = $("#searchbar")
    .val()
    .replace(/[^\w]|_/g, "")
    .toLowerCase();

  executeSearch(searchInput);
};

function searchClick(clickedid) {

  if (clickedid != "nana") {
    $("#nameHeader").text("...")
    $("#yearHeader").text("...")
    $("#bigSibList").empty();
    $("#littleSibList").empty();

    executeSearch(clickedid)
  }
}

// So that enter submits the search
$('input[type=text]').on('keydown', function(e) {
    if (e.which == 13) {
        e.preventDefault();
        searchText();
    }
});
