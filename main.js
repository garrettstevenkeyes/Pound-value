//Margins
var margin = { left:80, right:100, top:50, bottom:100 },
    height = 500 - margin.top - margin.bottom, 
    width = 1200 - margin.left - margin.right;

//SVG Canvas
var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + 
        ", " + margin.top + ")");

var div = d3.select("#chart-area").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

var t = function(){ return d3.transition().duration(500); }
var parseTime = d3.timeParse("%d-%m-%y");
var formatTime = d3.timeFormat("%b %e, %Y");

//add line for first
g.append("path")
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", "grey")
    .attr("stroke-width", "3px");

//Axis labels
var xLabel = g.append("text")
    .attr("class", "x axisLabel")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Time");
var yLabel = g.append("text")
    .attr("class", "y axisLabel")
    .attr("transform", "rotate(-90)")
    .attr("y", -60)
    .attr("x", -170)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Value in USD");

//scales
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

//X Axis
var xAxisCall = d3.axisBottom()
    .ticks(4);
    var xAxis = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height +")");

//Y axis
var yAxisCall = d3.axisLeft()
var yAxis = g.append("g")
    .attr("class", "y axis");

// Add jQuery UI slider
$("#date-slider").slider({
    range: true,
    max: parseTime("7-04-19").getTime(),
    min: parseTime("8-06-13").getTime(),
    step: 86400000, // One day
    values: [parseTime("8-06-13").getTime(), parseTime("7-04-19").getTime()],
    slide: function(event, ui){
        $("#dateLabel1").text(formatTime(new Date(ui.values[0])));
        $("#dateLabel2").text(formatTime(new Date(ui.values[1])));
        update();
    }
})

d3.json('data/values.json').then(function(data){
    filteredData = data;
    data.forEach(function(d){
        d.date = parseTime(d.date);
        d.euro = +d.euro;
        d.pound = +d.pound;
    });      
    
    // Run the visualization for the first time
    update();
})

function update() {
    sliderValues = $("#date-slider").slider("values");
    var dataTimeFiltered = filteredData.filter(function(d){
        // console.log(d.pound);
        return ((d.date >= sliderValues[0]) && (d.date <= sliderValues[1]))
    });
    
    // console.log(sliderValues[0]);

    

    //update scale
    x.domain(d3.extent(dataTimeFiltered, function(d) { return d.date; }));
    y.domain([d3.min(dataTimeFiltered, function(d){ return d.pound; }), 
        d3.max(dataTimeFiltered, function(d){ return d.pound; })]);

    //update axes
    xAxisCall.scale(x);
    xAxis.transition(t()).call(xAxisCall);
    yAxisCall.scale(y);
    yAxis.transition(t()).call(yAxisCall);

    // line path generator
    var line = d3.line()
        .x(function(d){ return x(d.date); })
        .y(function(d){ return y(d.pound); });

    //update line path
    g.select(".line")
        .transition(t)
        .attr("d", line(dataTimeFiltered));
    
    
}