var myFlower = function(selector, height, width){
  this.height = height;
  this.width = width;

  d3.select(selector).selectAll("svg").remove();

  this.svg = d3.select(selector).append("svg:svg")
    .attr('width', width)
    .attr('height', height);

  this.svg.append("svg:rect")
    .style("stroke", "#999")
    .style("fill", "#fff")
    .attr("width", width)
    .attr("height", height);

  this.force = d3.layout.force()
    .on("tick", this.tick.bind(this))
    .charge(100)      //TODO link to sidebar input
    .linkDistance(100)//TODO link to sidebar input
    .size([height, width]); //TODO add other parameters
}

myFlower.prototype.update = function(json) {

}
