var generateDataRecords = (dataIndexFormat) => {
  var dataRecords = []
  dataIndexFormat.forEach(d=>{
    obj = {}
    var headerName = Object.keys(d);
    headerName.forEach(h=>{
      obj[h] = d[h].value
    });
    dataRecords.push(obj)
  })
  return dataRecords  
}

function generateHighChartsDataSeries(dataRecordsInput) {
  dataHighCharts = []
  dataRecordsInput.forEach(function(d) {
    var rowValueOnly = []
    var columnNames = Object.keys(d);
    columnNames.forEach(function(c) {
      rowValueOnly.push(d[c])
    })
    dataHighCharts.push(rowValueOnly)
  });
  return dataHighCharts;
}

var calculateGrowthVsNPeriodAgo = (inputDataArraySortBasedOnTimeDescending, nPeriodAgo) => {
  if (inputDataArraySortBasedOnTimeDescending.length > nPeriodAgo && nPeriodAgo != 0) {
    var valueCurrent = parseFloat(inputDataArraySortBasedOnTimeDescending[0])
    var valueNPeriodAgo = parseFloat(inputDataArraySortBasedOnTimeDescending[nPeriodAgo])
    var valueGrowth = valueCurrent - valueNPeriodAgo
    var valueGrowthFormatted = "(" + numeral(valueGrowth).format('0.00a') + ")"
    var valueGrowthRate = valueNPeriodAgo != 0 ? valueGrowth / valueNPeriodAgo : 1.0
    var valueGrowthRateFormatted = (valueGrowth < 0 ? "⬇" : "⬆") + (valueGrowthRate*100).toFixed(2) + "%"
    return [valueGrowth, valueGrowthFormatted, valueGrowthRate, valueGrowthRateFormatted]
  } else {
    return [NaN, NaN, NaN, NaN]
  }
}

function movingAverage(values, N) {
  let i = 0;
  let sum = 0;
  const means = new Float64Array(values.length).fill(NaN);
  for (let n = Math.min(N - 1, values.length); i < n; ++i) {
    sum += values[i];
  }
  for (let n = values.length; i < n; ++i) {
    sum += values[i];
    means[i] = sum / N;
    sum -= values[i - N + 1];
  }
  return means;
}

var dynamicColor = (value, positive_is_bad) => {
  if (positive_is_bad == false) {
    if (value <= 0) {
      return "#FF5722";
    } else {
      return "#1db954";
    }
  } else {
    if (value <= 0) {
      return "#1db954";
    } else {
      return "#FF5722";
    }
  }
} 

function humanReadableNumber(value, is_human_readable) {
  if (is_human_readable == true) {
    return numeral(value).format("0.00a")
  } else {
    return value
  }
}

function percentageNumber(value, is_percentage_number) {
  if (is_percentage_number == true) {
    return numeral(value).format("0.00%")
  } else {
    return value
  }
}

function getFieldMetaInfoValue(queryResponse, fieldName) {
  const queryResponseFieldsMeasures = queryResponse.fields.measures
  f_measure = queryResponseFieldsMeasures.filter(d=>{
    return d.name == fieldName
  })

  return f_measure
}

function calculateAggregatedValue(inputArray1D, aggregationType) {
  switch (aggregationType) {
    case "sum":
      return d3.sum(inputArray1D);
      break;
    case "average":
      return d3.mean(inputArray1D);
      break;
    case "min":
      return d3.min(inputArray1D);
      break;
    case "max":
      return d3.max(inputArray1D);
      break;
    case "median":
      return d3.median(inputArray1D);
      break;
    case "major-between":
      return ( d3.quantile(inputArray1D, 0.25) + " ~ " + d3.quantile(inputArray1D, 0.75));
      break;
    case "latest":
      return inputArray1D[0];
      break;
  }
}

function translateAggregationType(aggregationType) {
  switch (aggregationType) {
    case "sum":
      return "Total";
      break;
    case "average":
      return "Average";
      break;
    case "max":
      return "Max";
      break;
    case "min":
      return "Min";
      break;
    case "median":
      return "Median";
      break;
    case "latest":
      return "latest";
      break;
  }
}

function updateChartBigNumberTrend(data, config, queryResponse) {
  function prepareChartInputParameters(data, queryResponse) {
    
    var dataRecords = generateDataRecords(data);
    var highchartsFigureWidth = document.getElementsByClassName("highcharts-figure")[0].offsetWidth;
    var pointWidthResponsive = parseInt((highchartsFigureWidth / dataRecords.length) * 0.8);
    var viewName = queryResponse.fields.dimensions.length > 0 ? queryResponse.fields.dimensions[0].view : queryResponse.fields.measures[0].view;
    var measureName = queryResponse.fields.measures[0].name;
    measureMetaInfoValue = getFieldMetaInfoValue(queryResponse, measureName)
    
    var xHeaderName = config.query_fields.dimensions[0].name;
    var xLabelShort = config.query_fields.dimensions[0].label_short;
    // var xHeaderNameDate = viewName + "." + inputDimensionNameLookML + "_date";
    // var xHeaderNameMonth = viewName + "." + inputDimensionNameLookML + "_month";
    // var xHeaderNameQuarter = viewName + "." + inputDimensionNameLookML + "_quarter";
    // var xHeaderNameWeek = viewName + "." + inputDimensionNameLookML + "_week";
    // var xHeaderNameYear = viewName + "." + inputDimensionNameLookML + "_year";
    var xHeaderNameDate = config.query_fields.dimensions[0].name;
    var xHeaderNameMonth = config.query_fields.dimensions[0].name;
    var xHeaderNameQuarter = config.query_fields.dimensions[0].name;
    var xHeaderNameWeek = config.query_fields.dimensions[0].name;
    var xHeaderNameYear = config.query_fields.dimensions[0].name;
    
    switch (xHeaderName) {
      case xHeaderNameDate:
        dataRecords.forEach((d) => { d[xHeaderName] = Date.parse(d[xHeaderNameDate]) });
        break;
      case xHeaderNameWeek:
        dataRecords.forEach((d) => { d[xHeaderName] = Date.parse(d[xHeaderNameWeek]) });
        break;
      case xHeaderNameMonth:
        dataRecords.forEach((d) => { d[xHeaderName] = Date.parse(d[xHeaderNameMonth] + "-01") });
        break;
      case xHeaderNameQuarter:
        dataRecords.forEach((d) => { d[xHeaderName] = Date.parse(d[xHeaderNameQuarter] + "-01") });
        break;
      case xHeaderNameYear:
        dataRecords.forEach((d) => { d[xHeaderName] = Date.parse(d[xHeaderNameYear] + "-01-01") });
        break;
    }

    var dataRecordsSorted = dataRecords.slice().sort((a, b) => d3.descending(a.xHeaderName, b.xHeaderName));
    dataHighCharts = generateHighChartsDataSeries(dataRecordsSorted);
    var chartTitle = queryResponse.fields.measures[0].label_short;
    var asOfDate = data[0][xHeaderName]["value"];
    var asOfDateValue = dataRecordsSorted[0][measureName];

    var dataRecordsSorted1D = []
    dataHighCharts.forEach(d=>{ dataRecordsSorted1D.push(d[1]) })

    switch (xHeaderName) {
      case xHeaderNameDate:
        growthRateArrayWoW = calculateGrowthVsNPeriodAgo(dataRecordsSorted1D, 7)
        growthRateArrayMoM = calculateGrowthVsNPeriodAgo(dataRecordsSorted1D, 30)
        growthRateArrayQoQ = calculateGrowthVsNPeriodAgo(dataRecordsSorted1D, 90)
        growthRateArrayYoY = calculateGrowthVsNPeriodAgo(dataRecordsSorted1D, 365)
        break;
      case xHeaderNameWeek:
        growthRateArrayWoW = calculateGrowthVsNPeriodAgo(dataRecordsSorted1D, 1)
        growthRateArrayMoM = calculateGrowthVsNPeriodAgo(dataRecordsSorted1D, 4)
        growthRateArrayQoQ = calculateGrowthVsNPeriodAgo(dataRecordsSorted1D, 12)
        growthRateArrayYoY = calculateGrowthVsNPeriodAgo(dataRecordsSorted1D, 52)
        break;
      case xHeaderNameMonth:
        growthRateArrayWoW = calculateGrowthVsNPeriodAgo(dataRecordsSorted1D, 0)
        growthRateArrayMoM = calculateGrowthVsNPeriodAgo(dataRecordsSorted1D, 1)
        growthRateArrayQoQ = calculateGrowthVsNPeriodAgo(dataRecordsSorted1D, 3)
        growthRateArrayYoY = calculateGrowthVsNPeriodAgo(dataRecordsSorted1D, 12)
        break;
      case xHeaderNameQuarter:
        growthRateArrayWoW = calculateGrowthVsNPeriodAgo(dataRecordsSorted1D, 0)
        growthRateArrayMoM = calculateGrowthVsNPeriodAgo(dataRecordsSorted1D, 0)
        growthRateArrayQoQ = calculateGrowthVsNPeriodAgo(dataRecordsSorted1D, 1)
        growthRateArrayYoY = calculateGrowthVsNPeriodAgo(dataRecordsSorted1D, 4)
        break;
      case xHeaderNameYear:
        growthRateArrayWoW = calculateGrowthVsNPeriodAgo(dataRecordsSorted1D, 0)
        growthRateArrayMoM = calculateGrowthVsNPeriodAgo(dataRecordsSorted1D, 0)
        growthRateArrayQoQ = calculateGrowthVsNPeriodAgo(dataRecordsSorted1D, 0)
        growthRateArrayYoY = calculateGrowthVsNPeriodAgo(dataRecordsSorted1D, 1)
        break;
    }

    var measureArray = [];
    var dataHighChartsMovingWindowAvgLine = [];

    if (dataHighCharts.length > 7) {
      dataHighCharts.map((d) => { measureArray.push(d[1]) });
      var measureArrayMovingWindowAvg = movingAverage(measureArray,config.moving_average_window).slice(config.moving_average_window-1, -1);
      dataHighCharts.map((e, i) => { dataHighChartsMovingWindowAvgLine.push([e[0],measureArrayMovingWindowAvg[i]]) });
    }

    return {
      'measureMetaInfoValue': measureMetaInfoValue
      , 'chartTitle': chartTitle
      , 'xHeaderName': xHeaderName
      , 'asOfDateValue': asOfDateValue
      , 'asOfDate': asOfDate
      , 'growthRateArrayWoW': growthRateArrayWoW
      , 'growthRateArrayMoM': growthRateArrayMoM
      , 'growthRateArrayQoQ': growthRateArrayQoQ
      , 'growthRateArrayYoY': growthRateArrayYoY
      , 'dataHighCharts': dataHighCharts
      , 'dataHighChartsMovingWindowAvgLine': dataHighChartsMovingWindowAvgLine
      , 'pointWidthResponsive': pointWidthResponsive
      , 'dataRecordsSorted': dataRecordsSorted
      , 'measureName': measureName

      , 'labelShort': xLabelShort
    }
  }

  var chartInputParameters = prepareChartInputParameters(data, queryResponse)
  var measureMetaInfoValue = chartInputParameters.measureMetaInfoValue
  var chartTitle = chartInputParameters.chartTitle
  var xHeaderName = chartInputParameters.xHeaderName

  var labelShort = chartInputParameters.labelShort

  var asOfDateValue = chartInputParameters.asOfDateValue
  var asOfDate = chartInputParameters.asOfDate
  var growthRateArrayWoW = chartInputParameters.growthRateArrayWoW
  var growthRateArrayMoM = chartInputParameters.growthRateArrayMoM
  var growthRateArrayQoQ = chartInputParameters.growthRateArrayQoQ
  var growthRateArrayYoY = chartInputParameters.growthRateArrayYoY
  var dataHighCharts = chartInputParameters.dataHighCharts
  var dataHighChartsMovingWindowAvgLine = chartInputParameters.dataHighChartsMovingWindowAvgLine
  var pointWidthResponsive = chartInputParameters.pointWidthResponsive

  var dataRecordsSortDescending = tidy(chartInputParameters.dataRecordsSorted, select([chartInputParameters.measureName]))

  var dataSeries = [];
  dataRecordsSortDescending.forEach((d) => {
    dataSeries.push(d[chartInputParameters.measureName]);
  });

  metricsValueAggregated = calculateAggregatedValue(dataSeries, config.aggregation_type);

  Highcharts.chart("container", {
    chart: {
      zoomType: "x",
      panning: "true",
      panKey: "shift",
      type: config.chart_type,
      events: {
        load: function() {
          this.title.on('mouseover', e => {
            myLabel = this.renderer.label(measureMetaInfoValue[0]['description'], e.x, e.y, 'rectangle')
              .css({ color: '#FFFFFF'})
              .attr({
                  fill: "#181818"
                , 'font-family': "Circular Spotify Text, Helvetica, Arial, sans-serif",
              })
              .add()
              .toFront();
          })
          this.title.on('mouseout', e => { if (myLabel) { myLabel.destroy(); }})
        }
      }
    },
    title: {
      text:
      chartTitle
      // + '<br>' + '<p class="highcharts-metrics-by">by ' + (xHeaderName.split('.')[1]).split('_')[2] + '</p>'
      + '<br>' + '<p class="highcharts-metrics-by">by ' + labelShort + '</p>'
        + '<br>'
        + '<br>'
        + '<br>'
        + "<p class='highcharts-metrics-value-prefix'>" + translateAggregationType(config.aggregation_type) + ": </p>" +
        '<p class="highcharts-metrics-value-latest">' + config.prefix 
        + humanReadableNumber(percentageNumber(metricsValueAggregated, config.is_percentage_number),config.is_human_readable) 
        + '<span class="highcharts-metrics-value-suffix">' + config.suffix + '</span>'
        ,
      align: "left",
    },
    subtitle: {
      text:
          '<p class="highcharts-metrics-growth-rate" style="color:' + dynamicColor(growthRateArrayWoW[0], config.positive_is_bad) + '">' + (growthRateArrayWoW[3] + growthRateArrayWoW[1]) + "</p>" + " WoW" + ";    "
        + '<p class="highcharts-metrics-growth-rate" style="color:' + dynamicColor(growthRateArrayMoM[0], config.positive_is_bad) + '">' + (growthRateArrayMoM[3] + growthRateArrayMoM[1]) + "</p>" + " MoM" + "; <br>"
        + '<p class="highcharts-metrics-growth-rate" style="color:' + dynamicColor(growthRateArrayQoQ[0], config.positive_is_bad) + '">' + (growthRateArrayQoQ[3] + growthRateArrayQoQ[1]) + "</p>" + " QoQ" + ";    "
        + '<p class="highcharts-metrics-growth-rate" style="color:' + dynamicColor(growthRateArrayYoY[0], config.positive_is_bad) + '">' + (growthRateArrayYoY[3] + growthRateArrayYoY[1]) + "</p>" + " YoY" + "; <br>"
        // + '<p class="highcharts-as-of-date"> as of ' + (xHeaderName.split('.')[1]).split('_')[2] + ": " + asOfDate + "</p>",
        + '<p class="highcharts-as-of-date"> as of ' + labelShort + ": " + asOfDate + "</p>",
      align: "left",
      useHTML: false,
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: undefined,
      },
      labels: {
        formatter: function() {
          // console.log(this.value)
          return humanReadableNumber(percentageNumber(this.value, config.is_percentage_number),config.is_human_readable) 
        }
      }
      // comment black for y-Axis reference line
      , plotLines: [{
        color: config.line_color_reference,
        width: 2,
        value: config.reference_line_value
      }]
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: true, 
      text: "Metrics Widget by Hong"
    },
    exporting: {
      enabled: false
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: [0, 0, 0, 300],
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get("rgba"),],
          ],
        },
        marker: {
          enabled: false,
        },
        lineWidth: 2,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },
    series: [
      {
        id: "default",
        name: chartTitle,
        color: config.line_color,
        data: dataHighCharts,
        pointWidth: pointWidthResponsive,
        lineWidth: 3,
        step: config.is_step_line,
        marker: {
          enabled: config.is_enable_marker,
        },
      },
      {
        id: "movingWindowAvgLine",
        // name: "Moving " + config.moving_average_window + ((xHeaderName.split('.')[1]).split('_')[2]).charAt(0) +" Avg. " + chartTitle,
        name: "Moving " + config.moving_average_window + " " + labelShort +" Avg. " + chartTitle,
        color: config.line_color_secondary,
        data: dataHighChartsMovingWindowAvgLine,
        pointWidth: pointWidthResponsive,
        lineWidth: 2,
        dashStyle: config.line_style_secondary,
        marker: {
          enabled: false,
        },
        visible: config.is_show_moving_average_line,
      },
    ],
    tooltip: {
      formatter: function() {
        return this.series.name + ": " + humanReadableNumber(percentageNumber(parseFloat(this.y), config.is_percentage_number),config.is_human_readable) + '<br> on: ' + ((new Date(this.x)).toISOString()).split('T')[0]
      },
      style: {
        color: "#000000",
        fontFamily: '"Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif'
      }
    },
  });
}