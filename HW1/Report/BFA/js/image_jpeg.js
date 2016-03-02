/* implementation heavily influenced by http://bl.ocks.org/1166403 */

// define dimensions of graph
var m = [80, 80, 80, 80]; // margins
var w = 1200 - m[1] - m[3]; // width
var h = 500 - m[0] - m[2]; // height


// create a simple data array that we'll plot with a line (this array represents only the Y values, X will just be the index location)
var data = [1.0000000000,0.7331710936,0.6763821304,0.6924535851,0.6715538163,0.6569911865,0.6469075338,0.6738560759,0.6459893564,0.6573258715,0.6744856910,0.6342121218,0.6831626444,0.6462762589,0.6529859478,0.6603727466,0.6334047349,0.6605309392,0.6506208370,0.6337119406,0.6972777130,0.6737810616,0.6444703934,0.6285529231,0.6598595234,0.6582791584,0.6614332770,0.6580413230,0.6751468000,0.6655621040,0.6696355697,0.6838540532,0.9407838162,0.6289137762,0.6672660523,0.6837582707,0.6948185015,0.6517018547,0.6375345196,0.6613817448,0.6863562239,0.6665163924,0.6790794570,0.6718034266,0.6619986840,0.6754979085,0.6726347006,0.6593775203,0.6551463387,0.6903118315,0.6852175796,0.6565650110,0.6825266539,0.6834930221,0.6715821710,0.6603611815,0.6786369079,0.6758542894,0.6931920740,0.6557613025,0.6904515933,0.6843178921,0.6845401645,0.6912030327,0.6598419561,0.6616454747,0.6442163266,0.6545961370,0.6358140725,0.6920590970,0.6810967538,0.6812893504,0.6764181765,0.7067425647,0.6772103631,0.6688565891,0.6330411429,0.6806441793,0.6634111507,0.6904004418,0.6646202567,0.6872144867,0.6918450182,0.6743596107,0.6741349255,0.6885740618,0.6804248354,0.6791144692,0.6595725530,0.6614516479,0.6872332370,0.6792880817,0.6646635524,0.6634248134,0.6600689841,0.6597405498,0.6205845182,0.6658302369,0.6589747432,0.7101154095,0.6849906337,0.7141974546,0.6611662892,0.6659683337,0.6659980109,0.7241436289,0.6797834096,0.6972241806,0.6691145868,0.7115487200,0.7060797906,0.7090210457,0.6749222277,0.6895715432,0.6991514850,0.7013559717,0.7050472109,0.6941956482,0.6717266436,0.6630062773,0.6797875299,0.6698663033,0.6706501021,0.6731488791,0.6483776798,0.6668990779,0.6629562300,0.6956505782,0.6573968998,0.6342607180,0.6436409184,0.6366795258,0.6167861134,0.6427777309,0.6526543942,0.6417050681,0.6349281206,0.6434117157,0.7073261685,0.6400223509,0.6722753678,0.6719808352,0.6892809212,0.6857621684,0.6510241127,0.6783817664,0.6978027803,0.6655266388,0.6529080472,0.6799928182,0.6801665018,0.6570973947,0.6294091472,0.6413443941,0.6818766185,0.6476010627,0.6521158905,0.6520309918,0.6779344434,0.6784799969,0.6571571489,0.6419655409,0.6713402372,0.6677243732,0.6775092877,0.6927703300,0.6679803096,0.6930898296,0.6687582352,0.6853013003,0.6737276186,0.6816957625,0.6577937477,0.6958193679,0.6773720310,0.6848171540,0.6237932187,0.6706313147,0.6577643628,0.6496708329,0.6783300995,0.6971447893,0.6818029929,0.6945623876,0.6696351566,0.6723119471,0.6707939430,0.6629854322,0.6501814058,0.6689792192,0.6469348920,0.6716635395,0.6294261262,0.6323112126,0.6307793362,0.6562550819,0.6614636229,0.6685631066,0.6757539257,0.7004176692,0.6561494564,0.6644080970,0.6560946041,0.6657328667,0.6384300226,0.6589910020,0.6422960458,0.6704909522,0.6357714741,0.6480416061,0.6880860595,0.6928130388,0.6896818619,0.6715967248,0.6818221184,0.6867542434,0.6439079089,0.6481716420,0.6920517655,0.6941369293,0.6750514457,0.6688729569,0.6597509798,0.6600415949,0.6400393582,0.6600074777,0.6789523756,0.6919912221,0.6670217609,0.6653701877,0.6592140900,0.6663213643,0.6295650054,0.6850221885,0.6816306890,0.6739895197,0.6479506498,0.6893791407,0.6711740976,0.6506234525,0.6564066494,0.6838408841,0.6673251723,0.6548239057,0.6665960131,0.6769214288,0.6776523919,0.6705157330,0.6734470943,0.6587385619,0.6732773752,0.6720132015,0.6812270550,0.6766441629,0.6946360713,0.7595863176];

// X scale will fit all values from data[] within pixels 0-w
var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
// Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
var y = d3.scale.linear().domain([0, 1]).range([h, 0]);
// automatically determining max range can work something like this
// var y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);
// create a line function that can convert data[] into x and y points
var line = d3.svg.line()
// assign the X function to plot our line as we wish
.x(function(d,i) { 
    // verbose logging to show what's actually being done
    //console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
    // return the X coordinate where we want to plot this datapoint
    return x(i); 
})
.y(function(d) { 
    // verbose logging to show what's actually being done
    //console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
    // return the Y coordinate where we want to plot this datapoint
    return y(d); 
})

// Add an SVG element with the desired dimensions and margin.
var graph = d3.select("#graph").append("svg:svg")
    .attr("width", w + m[1] + m[3])
    .attr("height", h + m[0] + m[2])
    .append("svg:g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");
// create yAxis
var xAxis = d3.svg.axis().scale(x).ticks(30).tickSize(-h).tickSubdivide(true);
// Add the x-axis.
graph.append("svg:g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + h + ")")
    .call(xAxis);
// create left yAxis
var yAxisLeft = d3.svg.axis().scale(y).ticks(30).orient("left");
// Add the y-axis to the left
graph.append("svg:g")
    .attr("class", "y axis")
    .attr("transform", "translate(-25,0)")
    .call(yAxisLeft);

// Add the line by appending an svg:path element with the data line we created above
// do this AFTER the axes above so that the line is above the tick-lines
graph.append("svg:path").attr("d", line(data));

 //Create Title 
graph.append("text")
.attr("x", w / 2 )
.attr("y", 0)
.style("font-size", "20px") 
.style("text-anchor", "middle")
.text("75% of image/jpeg");

d3.text("data.csv", function(text) {
    data = d3.csv.parseRows(text);
    //console.log(d3.csv.parseRows(data));
});