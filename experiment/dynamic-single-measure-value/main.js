const visObject = {
  options: {
    font_color: {
      type: "string",
      display: "color",
      label: "1. Choose Font Color",
      default: "#191414",
    },
    font_size: {
      type: "number",
      label: "1.1 Choose Font Size",
      default: 12,
    },
    font_style: {
      type: "string",
      display: "select",
      label: "1.2 Select Font Style",
      default: "normal",
      values: [
        { normal: "normal" },
        { italic: "italic" },
      ],
    },
    background_color: {
      type: "string",
      display: "color",
      label: "2. Choose Background Color",
      default: "#19E68C",
    }
    ,
    is_human_readable: {
      type: "boolean",
      label: "3. Toggle for Readable Number",
      default: false,
    },
    is_percentage_number: {
      type: "boolean",
      label: "4. Toggle for Percentage Number",
      default: false,
    }
    , prefix: {
      type: "string",
      display: "text",
      label: "5. Prefix(HTML syntax supported)",
      default: ""
    },
    suffix: {
      type: "string",
      display: "text",
      label: "6. Suffix(HTML syntax supported)",
      default: ""
    },
  },
  create: function (element, config) {
    element.innerHTML = `
      <style>
      // <link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet">
      //ANCHOR: define your CSS style here
      p {
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif;
        margin-top: 2px !important;
        margin-bottom: 2px !important;
      }
      .content h1, h2, h3, h4 {
        margin-top: 2px !important;
        margin-bottom: 2px !important;
      }
      .content {
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif;
        position: relative;
        display: inline-block;
        margin-top: 2px;
        margin-bottom: 2px;
        // border-bottom: 1px dotted black;
      }

      .content value {
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif;
        text-align: center;
        display: inline-flex;
      }
      
      .value:hover .tooltip {
        visibility: visible;
      }
      
      .value .tooltip {
        font-size: 12px;
        visibility: hidden;
        width: 120px;
        background-color: black;
        color: #fff;
        text-align: center;
        padding: 5px 0;
        border-radius: 2px;
        position: absolute;
        z-index: 10;
        bottom: 50%;
        left: 120%;
        margin-left: -60px;
      }

      #prefix p{
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif;
        margin-top: 0px !important;
        margin-bottom: 0px !important;
        width: 100%;
      }

      #suffix p{
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif;
        margin-top: 0px !important;
        margin-bottom: -10px !important;
        width: 100%;
      }

      </style>

      <span id="prefix"></span>
      <div id="singlevalue" class="content"></div>
      <span id="suffix"></span>
      
      `;
  },

  updateAsync: function (
    data,
    element,
    config,
    queryResponse,
    details,
    done
  ) {
    this.clearErrors();

    var viewName = queryResponse.fields.dimensions.length > 0 ? queryResponse.fields.dimensions[0].view : queryResponse.fields.measures[0].view;
    
    var dataRecords = generateDataRecords(data);

    if (config.query_fields.measures.length == 1) {
      fieldName = config.query_fields.measures[0].name
      fieldLabelShort = config.query_fields.measures[0].label_short
      fieldDescription = config.query_fields.measures[0].description
      var fieldValueRaw = +Object.values(dataRecords[0])[0]
      var fieldHtml = queryResponse.data[0][fieldName]['html']

    } else if (config.query_fields.measures.length == 0 && config.query_fields.dimensions.length == 1) {
      fieldName = config.query_fields.dimensions[0].name
      fieldLabelShort = config.query_fields.dimensions[0].label_short
      fieldDescription = config.query_fields.dimensions[0].description
      var fieldValueRaw = +Object.values(dataRecords[0])[0]
    } else {
      var fieldValueRaw = "Only support 1 dimension or 1 measure"
    }

    fieldValue = humanReadableNumber(percentageNumber(fieldValueRaw, config.is_percentage_number),config.is_human_readable)

    //ANCHOR: Actual Charting Function - Start
    
    function updateSingleValue() {
      if (fieldHtml) {
        document.getElementById('singlevalue').innerHTML = 
        config.prefix
        + " "
        + "<span class='value' style='margin-top:2px; margin-bottom:2px; text-align:center; display:inline-flex; color:"
        + config.font_color + ";"
        + 'background-color:' + config.background_color + ";"
        + 'font-size:' + config.font_size + "px;"
        + 'font-style:' + config.font_style + ";'"
        + 'title=' 
        + "'"
        + fieldDescription
        + "'"
        + ">"
        + fieldValue
        + " <a href="
        + fieldHtml
        + "target='_blank'>"
        + "<i class='fas fa-external-link-alt fa-sm'></i>"
        + "</a>"
        + "</span>"
        + "<sup style='margin-top:2px; margin-bottom:2px; font-size:12px; color:#999999; font-style: italic; position: relative; top: -8px'>"
        + fieldLabelShort
        + "</sup>"
        + " "
        + config.suffix
      } else {
        document.getElementById('singlevalue').innerHTML = 
        config.prefix
        + " "
        + "<span class='value' style='margin-top:2px; margin-bottom:2px; text-align:center; display:inline-flex; color:"
        + config.font_color + ";"
        + 'background-color:' + config.background_color + ";"
        + 'font-size:' + config.font_size + "px;"
        + 'font-style:' + config.font_style + ";'"
        + 'title=' 
        + "'"
        + fieldDescription
        + "'"
        + ">"
        + fieldValue
        + "</span>"
        + "<sup style='margin-top:2px; margin-bottom:2px; font-size:12px; color:#999999; font-style: italic; position: relative; top: -8px'>"
        + fieldLabelShort
        + "</sup>"
        + " "
        + config.suffix
      }
    }

    updateSingleValue()

    //ANCHOR: Actual Charting Function - Ends
    done();
  },
};

looker.plugins.visualizations.add(visObject);




