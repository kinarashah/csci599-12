/* implementation heavily influenced by http://bl.ocks.org/1166403 */

// define dimensions of graph
var m = [80, 80, 80, 80]; // margins
var w = 1200 - m[1] - m[3]; // width
var h = 500 - m[0] - m[2]; // height


// create a simple data array that we'll plot with a line (this array represents only the Y values, X will just be the index location)
var data = [0.8689165960011597,0.8783824157446175,0.8859124618971278,0.8757618474328186,0.8912253476551762,0.8808492924780132,0.872920442036243,0.8798548143190711,0.889619838185072,0.8762411203358058,0.9186583653725966,0.8863092463927026,0.8800892891767251,0.87492007757562,0.8782641156369746,0.8843166306247118,0.8829375849451092,0.8737108007944778,0.8854010235833037,0.8675413190420754,0.883570942350309,0.8817803655679038,0.8855148139027689,0.8850022598000455,0.8804404592199037,0.8738927076424852,0.8800892891767251,0.8818964116281877,0.8742559572795818,0.8797374429282171,0.8906180173397128,0.8927075612339961,1.0,0.87731490470977,0.8786188075969039,0.8824755804350983,0.8788548728838673,0.8825333819763979,0.8707754334300845,0.8824177398761176,0.8878878640977265,0.8755217279764445,0.8821862358796213,0.8895642158286446,0.8822441290087799,0.8791495368095076,0.8786188075969039,0.9231100872550861,0.9815636729728416,0.8883364011434833,0.8897310122138178,0.8933079972471314,0.8926528710505434,0.8988893693476405,0.896119993282861,0.8987836317805223,0.8844882638883163,0.890285889843024,0.8790317324782042,0.8872693198031778,0.8928168729373129,0.8840301684997928,0.890285889843024,0.8956363791742773,0.877790126545586,0.873224835914185,0.8951515010118622,0.8824755804350983,0.8826489716359671,0.8843166306247118,0.8848881701887275,0.8910047445449991,0.8795612864659863,0.8790906546917187,0.876061537600094,0.8809076315843942,0.8794437263158881,0.8793849389393177,0.8834559346407149,0.881315422064563,0.8850592881181468,0.8798548143190711,0.8903412929818975,0.8790317324782042,0.8923792135808365,0.8912253476551762,0.8824177398761176,0.8863658683140955,0.8856853259045854,0.8842020914507118,0.8897865838268124,0.8818964116281877,0.8763607370386953,0.8900641489026502,0.8919954072036477,0.8921599999914744,0.8805573591021376,0.8973500864471577,0.891720762556448,0.8915007373944189,0.8850592881181468,0.9168947593298893,0.8704051690239548,0.8840301684997928,0.8908943232454699,0.8959589307590681,0.8983600495716598,0.8792672863269614,0.8774338207641461,0.8789138521474089,0.9061432691314644,0.9175640611279384,0.8818384082071036,0.8751007851127114,0.8918855831325404,0.8890629311590731,0.9038943551983958,0.8829375849451092,0.8827644675321616,0.8885602474283705,0.8937434402544376,0.8887838398407757,0.8855716621274179,0.8893415968417463,0.8825911859463899,0.8821862358796213,0.8885602474283705,0.8892858897087138,0.8765400261008405,0.8767191394152372,0.8668497905898157,0.8758218119083772,0.8779087338269235,0.889619838185072,0.8759417248057438,0.8840875009717327,0.8716978031690643,0.8741349542867161,0.887100260034356,0.8776120605036521,0.8823598810019846,0.8697864042694943,0.8738927076424852,0.8847168918586896,0.8682927499612708,0.875401560584021,0.883110538496024,0.8830528986150264,0.8811407601795065,0.8850022598000455,0.8812572338912048,0.8877193759187729,0.8782049262437505,0.8712679477184754,0.8815480521123233,0.8694141282361171,0.8820124048082784,0.8867616705158239,0.8891744444407365,0.8838581041992778,0.8695383082475439,0.8907285858842497,0.8910599104117874,0.8840875009717327,0.8713908636383891,0.8876069708071648,0.87731490470977,0.883110538496024,0.8757018417688816,0.8799134507408587,0.8836858571343172,0.8869310437019884,0.8903412929818975,0.8875507322336513,0.8833984242456004,0.8862526272166621,0.8788548728838673,0.8791495368095076,0.8881683262428728,0.8815480521123233,0.8860826237154921,0.8832257431033219,0.8752211504077709,0.8809076315843942,0.874376901854245,0.8777307833885137,0.8801478714011561,0.8821862358796213,0.89067331988115,0.8891744444407365,0.8869310437019884,0.8844310775449529,0.8846026238722298,0.8747995137250009,0.8844882638883163,0.881315422064563,0.8757018417688816,0.8867051913781188,0.8831681395579422,0.8760016302892226,0.881431784529264,0.8807909556519357,0.8838006996934418,0.8855716621274179,0.8809659520703762,0.8790906546917187,0.8790317324782042,0.8806741842434458,0.8788548728838673,0.8873819327550473,0.8801478714011561,0.8776120605036521,0.8801478714011561,0.887156637404465,0.8851732709688921,0.8792084210532128,0.8811990063159096,0.8793261115620528,0.8825911859463899,0.8726765678641497,0.8833408751210795,0.8785006393107058,0.8903412929818975,0.8837432771476073,0.883513447543916,0.8903412929818975,0.8801478714011561,0.8784415476807759,0.876778790606594,0.8829375849451092,0.8822441290087799,0.8769576701398754,0.8842593700125403,0.8821283036419046,0.8852302459470945,0.8798548143190711,0.883110538496024,0.8820124048082784,0.8787368783629679,0.8832257431033219,0.8912804667156271,0.887156637404465,0.8799720893585288,0.8826489716359671,0.8942320643148697,0.8838581041992778,0.882995240545765,0.8915557734573728,0.888616176196039,0.8869310437019884,0.8934713929324433,0.8775526594781037,0.8919405034192189,0.8809659520703762,0.8908943232454699,0.8738320849044435];

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
.text("75% of Video/quicktime");

d3.text("data.csv", function(text) {
    data = d3.csv.parseRows(text);
    //console.log(d3.csv.parseRows(data));
});