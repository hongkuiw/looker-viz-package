// Global CONSTANTS
const { tidy, select, distinct, arrange, desc } = Tidy;
const visObject = {
  options: {
    chart_type: {
      type: "string",
      display: "select",
      label: "1. Select Line Chart Style",
      default: "line",
      values: [
        { Line: "line" },
        { Bar: "column" },
        { Spline: "spline" },
        { Area: "area" },
      ],
    },
    is_enable_marker: {
      type: "boolean",
      label: "1.1. Toggle for Marker",
      default: false,
    },
    line_color: {
      type: "string",
      display: "color",
      label: "2. Choose Primary Color",
      default: "#3259F9",
    },
    is_human_readable: {
      type: "boolean",
      label: "3. Toggle for Readable Number",
      default: false,
    },
    is_percentage_number: {
      type: "boolean",
      label: "4. Toggle for Percentage Number",
      default: false,
    },
    aggregation_type: {
      type: "string",
      display: "select",
      label: "4.1 Select Aggregation Type",
      default: "latest",
      values: [
        { latest: "latest"},
        { sum: "sum" },
        { average: "average" },
        { min: "min" },
        { max: "max" },
        { median: "median" },
      ],
    },
    // num_decimals: {
    //   type: "string",
    //   display: "select",
    //   label: "5.1 No. Decimals",
    //   default: "2",
    //   values: [
    //     { two: "2" },
    //     { zero: "0" },
    //     { one: "1" },
    //     { three: "3" },
    //     { four: "4" },
    //   ],
    // },
    positive_is_bad: {
      type: "boolean",
      label: "5. Toggle for Positive Value is Bad or not?",
      default: false,
    },
    is_step_line: {
      type: "boolean",
      label: "6. Toggle for Step for Line Chart",
      default: false,
    },
    is_show_moving_average_line: {
      type: "boolean",
      label: "7. Toggle for Moving Average Line?",
      default: false,
    },
    line_color_secondary: {
      type: "string",
      display: "color",
      label: "7.1 Choose Secondary Color",
      default: "#85E0FF",
    },
    line_style_secondary: {
      type: "string",
      display: "select",
      label: "7.2 Choose Secondary Line Style",
      default: "Solid",
      values: [{ Solid: "Solid" }, { Dash: "Dash" }, { Dot: "Dot" }],
    },
    moving_average_window: {
      type: "string",
      display: "select",
      label: "7.3 Select window size for Moving Average Line",
      default: "7",
      values: [{ 3: "3" }, { 4: "4" }, { 6: "6" }, { 7: "7" }, { 14: "14" }, { 30: "30" }],
    },
    prefix: {
      type: "string",
      display: "text",
      label: "8. Prefix of Metrics",
      default: " "
    },
    suffix: {
      type: "string",
      display: "text",
      label: "9. Suffix of Metrics",
      default: " "
    }
    // comment black for y-Axis reference line
    // , line_color_reference: {
    //   type: "string",
    //   display: "color",
    //   label: "X. Choose Reference Line Color",
    //   default: "#666666",
    // }
    // , reference_line_value: {
    //   type: "number",
    //   display: "select",
    //   label: "X.1 Input Reference Line Value",
    //   default: 0,
    // }
  },
  create: function (element, config) {
    element.innerHTML = `
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet">
      <style>
      .highcharts-figure #container{
        height: 90%;
        width: 90%;
        margin-left: -20px;
        position: absolute;
        /* fully responsiveness */
      }
      .highcharts-figure #container:hover {
      }
      
      .highcharts-figure #container .highcharts-container {
        /* border-radius: 20px; */
        /* filter: drop-shadow(2px 2px 2px #999999); */
      }
      
      .highcharts-title {
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif;
        color: "#181818";
        font-size: 24px !important;
        margin-bottom: 10px;
        font-weight: 400;
      }
      
      .highcharts-metrics-value-latest {
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif;
        color: "#181818";
        font-size: 50px;
        line-height: 52px;
      }
      
      .highcharts-subtitle {
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif;
        color: "#181818";
        font-size: 14px;
      }
      
      .highcharts-subtitle text {
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif;
        color: "#181818";
        font-size: 14px;
        fill: #999999 !important;
      }
      
      .highcharts-axis-title {
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif;
      }
      
      .highcharts-axis-labels {
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif;
      }
      
      .highcharts-axis-labels .highcharts-yaxis-labels {
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif;
        fill: #999999 !important;
      }
      
      .highcharts-axis-labels .highcharts-xaxis-labels {
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif;
        fill: #999999 !important;
      }
      
      .highcharts-metrics-by {
        font-size: 14px;
        font-style: italic;
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif;
        fill: #999999 !important;
      }
      
      .highcharts-metrics-value-prefix {
        font-size: 14px;
        font-style: Italic;
      }
      
      .highcharts-metrics-value-suffix {
        font-size: 14px;
        font-style: italic;
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif;
        fill: #999999 !important;
      }
      
      .highcharts-data-label {
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif;
        font-weight: 200;
      }
      
      .highcharts-as-of-date {
        font-size: 12px;
        font-style: italic;
        fill: #999999 !important;
      }
      
      .highcharts-metrics-value-prefix {
        font-size: 14px;
        font-style: Italic;
      }

      .highcharts-metrics-value-suffix {
        font-size: 14px;
        font-style: italic;
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif;
        fill: #999999 !important;
      }

      .highcharts-data-label {
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif;
        font-weight: 200;
      }

      .highcharts-credits {
        font-style: italic;
      }

      </style>
      <figure class="highcharts-figure">
      <div id="container"></div>
      </figure>
      `;
  },
  updateAsync: function (data, element, config, queryResponse, details, done) {
    this.clearErrors();
    var errorMessage = `
    Instructions🧭
    This Metrics Widget requires ONLY
    - 1 date dimension_group: in Date ISO format (yyyy-mm-dd) e.g.: 2021-01-03
    - 1 measure
    Contact Hong Wu(@hongkuiw on Slack) or hongkuiw@spotify.com for Instruction or Help
    `;

    if (
      queryResponse.fields.dimensions.length == 0 ||
      (queryResponse.fields.dimensions.length == 1 && queryResponse.fields.measures.length > 1)
    ) {
      console.error(errorMessage);
      return;
    }

    updateChartBigNumberTrend(data, config, queryResponse)

    done();
  },
};

looker.plugins.visualizations.add(visObject);
