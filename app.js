var initStackedBarChart = {
    draw: function (config) {
        me = this,
            domEle = config.element,
            stackKey = config.key,
            data = config.data,
            margin = {
                top: 20,
                right: 20,
                bottom: 30,
                left: 80
            },
            parseDate = d3.timeParse("%Y"),
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom,
            xScale = d3.scaleLinear().rangeRound([0, width]),
            yScale = d3.scaleBand().rangeRound([height, 0]).padding(0.1),
            color = d3.scaleOrdinal(d3.schemePaired),
            xAxis = d3.axisBottom(xScale),
            yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%Y")),
            svg = d3.select("#" + domEle).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        var legendRectSize = 18;
        var legendSpacing = 4;

        var stack = d3.stack()
            .keys(stackKey)
            .order(d3.stackOrder)
            .offset(d3.stackOffsetNone);

        var layers = stack(data);

        //sorts with totals instead of by date
        // data.sort(function (a, b) {
        //     return b.total - a.total;
        // });
        yScale.domain(data.map(function (d) {
            return parseDate(d.date);
        }));

        //x max
        xScale.domain([0, d3.max(layers[layers.length - 1], function (d) {
            return 3000000;
        })]).nice();

        var layer = svg.selectAll(".layer")
            .data(layers)
            .enter().append("g")
            .attr("class", "layer")
            .style("fill", function (d, i) {
                return color(i);
            });

        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        layer.selectAll("rect")
            .data(function (d) {
                return d;
            })
            .enter().append("rect")
            .attr("y", function (d) {
                return yScale(parseDate(d.data.date));
            })
            .attr("x", function (d) {
                return xScale(d[0]);
            })
            .attr("height", yScale.bandwidth())
            .attr("width", function (d) {
                return xScale(d[1]) - xScale(d[0])
            })
            .on('mouseover', function (d, i) {
                d3.select(this).transition()
                    .duration('200')
                    .attr('opacity', '.7');
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(d[1] - d[0])
                    .style("left", (d3.event.pageX+10) + "px")
                    .style("top", (d3.event.pageY - 15) + "px");


            })
            .on('mouseout', function (d, i) {
                d3.select(this).transition()
                    .duration('200')
                    .attr('opacity', '1');
                div.transition()
                    .duration('200')
                    .style("opacity", 0);
            });

        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + (height + 5) + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(0,0)")
            .call(yAxis);

        var legend = svg.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function (d, i) {
                var height = legendRectSize + legendSpacing;
                var offset = height * color.domain().length / 2;
                var horz = 40 * legendRectSize;
                var vert = i * height + offset;
                return 'translate(' + horz + ',' + vert + ')';
            });

        legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .style('fill', color)
            .style('stroke', color);

        legend.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function (d) {
                return key[d]
            });


    }

}
var data = [{
    "date": "2016",
    "total":2319475,
    "Alzheimer's disease": 116103,
    "Cancer": 598038,
    "Chronic lower respiratory diseases": 154596,
    "Diabetes": 80058,
    "Unintentional injuries": 0,
    "Heart disease": 635260,
    "Influenza and pneumonia": 0,
    "Kidney disease": 0,
    "Stroke": 0,
    "Suicide": 0

}, {
    "date": "2015",
    "total": 2712630,
    "Alzheimer's disease": 110561,
    "Cancer": 595930,
    "Chronic lower respiratory diseases": 155041,
    "Diabetes": 79535,
    "Unintentional injuries": 0,
    "Heart disease": 633842,
    "Influenza and pneumonia": 0,
    "Kidney disease": 0,
    "Stroke": 0,
    "Suicide": 0
}, {
    "date": "2014",
    "total": 2626418,
    "Alzheimer's disease": 93541,
    "Cancer": 591700,
    "Chronic lower respiratory diseases": 147101,
    "Diabetes": 76488,
    "Unintentional injuries": 0,
    "Heart disease": 614348,
    "Influenza and pneumonia": 0,
    "Kidney disease": 0,
    "Stroke": 0,
    "Suicide": 0
}, {
    "date": "2013",
    "total": 2596993,
    "Alzheimer's disease": 84767,
    "Cancer": 584881,
    "Chronic lower respiratory diseases": 149205,
    "Diabetes": 75578,
    "Unintentional injuries": 0,
    "Heart disease": 611105,
    "Influenza and pneumonia": 0,
    "Kidney disease":0 ,
    "Stroke": 0,
    "Suicide":0 
}, {
    "date": "2012",
    "total": 2543279,
    "Alzheimer's disease": 83637,
    "Cancer": 582623,
    "Chronic lower respiratory diseases": 143489,
    "Diabetes": 73932,
    "Unintentional injuries": 0,
    "Heart disease": 599711,
    "Influenza and pneumonia": 0,
    "Kidney disease": 0,
    "Stroke": 0,
    "Suicide":0
}, {
    "date": "2011",
    "total": 2515458,
    "Alzheimer's disease": 84974,
    "Cancer": 576691,
    "Chronic lower respiratory diseases": 142943,
    "Diabetes": 73831,
    "Unintentional injuries":0 ,
    "Heart disease": 596577,
    "Influenza and pneumonia": 0,
    "Kidney disease": 0,
    "Stroke": 0,
    "Suicide":0
}, {
    "date": "2010",
    "total": 2468435,
    "Alzheimer's disease": 83494,
    "Cancer": 574743,
    "Chronic lower respiratory diseases": 138080,
    "Diabetes": 69071,
    "Unintentional injuries": 0,
    "Heart disease": 597689,
    "Influenza and pneumonia": 0,
    "Kidney disease": 0,
    "Stroke": 0,
    "Suicide":0
}, {
    "date": "2009",
    "total": 2437163,
    "Alzheimer's disease": 79003,
    "Cancer": 567628,
    "Chronic lower respiratory diseases": 137353,
    "Diabetes": 68705,
    "Unintentional injuries": 0,
    "Heart disease": 599413,
    "Influenza and pneumonia": 0,
    "Kidney disease": 0,
    "Stroke": 0,
    "Suicide":0
}, {
    "date": "2008",
    "total": 2471984,
    "Alzheimer's disease": 82435,
    "Cancer": 565469,
    "Chronic lower respiratory diseases": 141090,
    "Diabetes": 70553,
    "Unintentional injuries": 0,
    "Heart disease": 616828,
    "Influenza and pneumonia": 0,
    "Kidney disease": 0,
    "Stroke": 0,
    "Suicide":0
}, {
    "date": "2007",
    "total": 2423712,
    "Alzheimer's disease": 74632,
    "Cancer": 562875,
    "Chronic lower respiratory diseases": 127924,
    "Diabetes": 71382,
    "Unintentional injuries": 0,
    "Heart disease": 616067,
    "Influenza and pneumonia": 0,
    "Kidney disease": 0,
    "Stroke": 0,
    "Suicide":0
}, {
    "date": "2006",
    "total": 2426264,
    "Alzheimer's disease": 72432,
    "Cancer": 559888,
    "Chronic lower respiratory diseases": 124583,
    "Diabetes": 72449,
    "Unintentional injuries": 0,
    "Heart disease": 631636,
    "Influenza and pneumonia": 0,
    "Kidney disease": 0,
    "Stroke": 0,
    "Suicide":0
}, {
    "date": "2005",
    "total": 2448017,
    "Alzheimer's disease": 71599,
    "Cancer": 559312,
    "Chronic lower respiratory diseases": 130933,
    "Diabetes": 75119,
    "Unintentional injuries": 0,
    "Heart disease": 652091,
    "Influenza and pneumonia": 0,
    "Kidney disease": 0,
    "Stroke": 0,
    "Suicide":0
}, {
    "date": "2004",
    "total": 2397615,
    "Alzheimer's disease": 65965,
    "Cancer": 553888,
    "Chronic lower respiratory diseases": 121987,
    "Diabetes": 73138,
    "Unintentional injuries": 0,
    "Heart disease": 652486,
    "Influenza and pneumonia": 0,
    "Kidney disease": 0,
    "Stroke": 0,
    "Suicide":0
}, {
    "date": "2003",
    "total": 2448288,
    "Alzheimer's disease": 63457,
    "Cancer": 556902,
    "Chronic lower respiratory diseases": 126382,
    "Diabetes": 74219,
    "Unintentional injuries": 0,
    "Heart disease": 685089,
    "Influenza and pneumonia": 0,
    "Kidney disease": 0,
    "Stroke": 0,
    "Suicide":0
}, {
    "date": "2002",
    "total": 2443387,
    "Alzheimer's disease": 58866,
    "Cancer": 557271,
    "Chronic lower respiratory diseases": 124816,
    "Diabetes": 73249,
    "Unintentional injuries": 0,
    "Heart disease": 696947,
    "Influenza and pneumonia": 0,
    "Kidney disease": 0,
    "Stroke": 0,
    "Suicide":0
}, {
    "date": "2001",
    "total": 2416425,
    "Alzheimer's disease": 53852,
    "Cancer": 553768,
    "Chronic lower respiratory diseases": 123013,
    "Diabetes": 71372,
    "Unintentional injuries": 0,
    "Heart disease": 700142,
    "Influenza and pneumonia": 0,
    "Kidney disease": 0,
    "Stroke": 0,
    "Suicide":0
}, {
    "date": "2000",
    "total": 2403351,
    "Alzheimer's disease": 49558,
    "Cancer": 553091,
    "Chronic lower respiratory diseases": 122009,
    "Diabetes": 69301,
    "Unintentional injuries": 0,
    "Heart disease": 710760,
    "Influenza and pneumonia": 0,
    "Kidney disease": 0,
    "Stroke": 0,
    "Suicide":0
}];
var key = ["Alzheimer's disease", "Cancer", "Chronic lower respiratory diseases","Diabetes", "Unintentional injuries", "Heart disease", "Influenza and pneumonia", "Kidney disease", "Stroke", "Suicide"];
initStackedBarChart.draw({
    data: data,
    key: key,
    element: 'stacked-bar'
});