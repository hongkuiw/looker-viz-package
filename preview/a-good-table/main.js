// dependecies
// https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js
// https://cdn.datatables.net/1.11.3/js/jquery.dataTables.js
const visObject = {
  options: {
  },
  create: function (element, config) {
    element.innerHTML = `
      <style>
      //ANCHOR: define your CSS style here
      #container {
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif !important;
      }
      #container_length {
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif !important;
        font-size: 12px;       
      }
      .dataTables_filter {
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif !important;
        font-size: 12px;       
      }
      .dataTables_info {
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif !important;
        font-size: 12px;
      }
      #container_paginate {
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif !important;
        font-size: 12px;
      }
      mark {
        background-color: #1DB954 !important;
        color: #ffffff !important;
      }
      table.dataTable {
        width: 100%;
        margin: 0 auto;
        clear: both;
        border-collapse: separate;
        border-spacing: 0
      }
      
      table.dataTable thead th,
      table.dataTable tfoot th {
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif !important;
        font-size: 12px;
        font-weight: bold;
      }
      
      table.dataTable thead th,
      table.dataTable thead td {
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif !important;
        font-size: 12px;
        padding: 5px 9px;
        border-bottom: 1px solid #111
      }
      
      table.dataTable thead th:active,
      table.dataTable thead td:active {
        outline: none
      }
      
      table.dataTable tfoot th,
      table.dataTable tfoot td {
        padding: 10px 18px 6px 18px;
        border-top: 1px solid #111
      }
      
      table.dataTable thead .sorting,
      table.dataTable thead .sorting_asc,
      table.dataTable thead .sorting_desc,
      table.dataTable thead .sorting_asc_disabled,
      table.dataTable thead .sorting_desc_disabled {
        cursor: pointer;
        *cursor: hand;
        background-repeat: no-repeat;
        background-position: center right
      }
      
      table.dataTable thead .sorting {
        background-image: url("../images/sort_both.png")
      }
      
      table.dataTable thead .sorting_asc {
        background-image: url("../images/sort_asc.png") !important
      }
      
      table.dataTable thead .sorting_desc {
        background-image: url("../images/sort_desc.png") !important
      }
      
      table.dataTable thead .sorting_asc_disabled {
        background-image: url("../images/sort_asc_disabled.png")
      }
      
      table.dataTable thead .sorting_desc_disabled {
        background-image: url("../images/sort_desc_disabled.png")
      }
      table.dataTable tbody {
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif !important;
        font-weight: 400;
        font-size: 12px;
      }
      table.dataTable tbody tr {
        background-color: #fff
      }
      
      table.dataTable tbody tr.selected {
        background-color: #b0bed9
      }
      
      table.dataTable tbody th,
      table.dataTable tbody td {
        padding: 8px 10px
      }
      
      table.dataTable.row-border tbody th,
      table.dataTable.row-border tbody td,
      table.dataTable.display tbody th,
      table.dataTable.display tbody td {
        border-top: 1px solid #ddd
      }
      
      table.dataTable.row-border tbody tr:first-child th,
      table.dataTable.row-border tbody tr:first-child td,
      table.dataTable.display tbody tr:first-child th,
      table.dataTable.display tbody tr:first-child td {
        border-top: none
      }
      
      table.dataTable.cell-border tbody th,
      table.dataTable.cell-border tbody td {
        border-top: 1px solid #ddd;
        border-right: 1px solid #ddd
      }
      
      table.dataTable.cell-border tbody tr th:first-child,
      table.dataTable.cell-border tbody tr td:first-child {
        border-left: 1px solid #ddd
      }
      
      table.dataTable.cell-border tbody tr:first-child th,
      table.dataTable.cell-border tbody tr:first-child td {
        border-top: none
      }
      
      table.dataTable.stripe tbody tr.odd,
      table.dataTable.display tbody tr.odd {
        background-color: #f9f9f9
      }
      
      table.dataTable.stripe tbody tr.odd.selected,
      table.dataTable.display tbody tr.odd.selected {
        background-color: #acbad4
      }
      
      table.dataTable.hover tbody tr:hover,
      table.dataTable.display tbody tr:hover {
        background-color: #f6f6f6
      }
      
      table.dataTable.hover tbody tr:hover.selected,
      table.dataTable.display tbody tr:hover.selected {
        background-color: #aab7d1
      }
      
      table.dataTable.order-column tbody tr>.sorting_1,
      table.dataTable.order-column tbody tr>.sorting_2,
      table.dataTable.order-column tbody tr>.sorting_3,
      table.dataTable.display tbody tr>.sorting_1,
      table.dataTable.display tbody tr>.sorting_2,
      table.dataTable.display tbody tr>.sorting_3 {
        background-color: #fafafa
      }
      
      table.dataTable.order-column tbody tr.selected>.sorting_1,
      table.dataTable.order-column tbody tr.selected>.sorting_2,
      table.dataTable.order-column tbody tr.selected>.sorting_3,
      table.dataTable.display tbody tr.selected>.sorting_1,
      table.dataTable.display tbody tr.selected>.sorting_2,
      table.dataTable.display tbody tr.selected>.sorting_3 {
        background-color: #acbad5
      }
      
      table.dataTable.display tbody tr.odd>.sorting_1,
      table.dataTable.order-column.stripe tbody tr.odd>.sorting_1 {
        background-color: #f1f1f1
      }
      
      table.dataTable.display tbody tr.odd>.sorting_2,
      table.dataTable.order-column.stripe tbody tr.odd>.sorting_2 {
        background-color: #f3f3f3
      }
      
      table.dataTable.display tbody tr.odd>.sorting_3,
      table.dataTable.order-column.stripe tbody tr.odd>.sorting_3 {
        background-color: whitesmoke
      }
      
      table.dataTable.display tbody tr.odd.selected>.sorting_1,
      table.dataTable.order-column.stripe tbody tr.odd.selected>.sorting_1 {
        background-color: #a6b4cd
      }
      
      table.dataTable.display tbody tr.odd.selected>.sorting_2,
      table.dataTable.order-column.stripe tbody tr.odd.selected>.sorting_2 {
        background-color: #a8b5cf
      }
      
      table.dataTable.display tbody tr.odd.selected>.sorting_3,
      table.dataTable.order-column.stripe tbody tr.odd.selected>.sorting_3 {
        background-color: #a9b7d1
      }
      
      table.dataTable.display tbody tr.even>.sorting_1,
      table.dataTable.order-column.stripe tbody tr.even>.sorting_1 {
        background-color: #fafafa
      }
      
      table.dataTable.display tbody tr.even>.sorting_2,
      table.dataTable.order-column.stripe tbody tr.even>.sorting_2 {
        background-color: #fcfcfc
      }
      
      table.dataTable.display tbody tr.even>.sorting_3,
      table.dataTable.order-column.stripe tbody tr.even>.sorting_3 {
        background-color: #fefefe
      }
      
      table.dataTable.display tbody tr.even.selected>.sorting_1,
      table.dataTable.order-column.stripe tbody tr.even.selected>.sorting_1 {
        background-color: #acbad5
      }
      
      table.dataTable.display tbody tr.even.selected>.sorting_2,
      table.dataTable.order-column.stripe tbody tr.even.selected>.sorting_2 {
        background-color: #aebcd6
      }
      
      table.dataTable.display tbody tr.even.selected>.sorting_3,
      table.dataTable.order-column.stripe tbody tr.even.selected>.sorting_3 {
        background-color: #afbdd8
      }
      
      table.dataTable.display tbody tr:hover>.sorting_1,
      table.dataTable.order-column.hover tbody tr:hover>.sorting_1 {
        background-color: #eaeaea
      }
      
      table.dataTable.display tbody tr:hover>.sorting_2,
      table.dataTable.order-column.hover tbody tr:hover>.sorting_2 {
        background-color: #ececec
      }
      
      table.dataTable.display tbody tr:hover>.sorting_3,
      table.dataTable.order-column.hover tbody tr:hover>.sorting_3 {
        background-color: #efefef
      }
      
      table.dataTable.display tbody tr:hover.selected>.sorting_1,
      table.dataTable.order-column.hover tbody tr:hover.selected>.sorting_1 {
        background-color: #a2aec7
      }
      
      table.dataTable.display tbody tr:hover.selected>.sorting_2,
      table.dataTable.order-column.hover tbody tr:hover.selected>.sorting_2 {
        background-color: #a3b0c9
      }
      
      table.dataTable.display tbody tr:hover.selected>.sorting_3,
      table.dataTable.order-column.hover tbody tr:hover.selected>.sorting_3 {
        background-color: #a5b2cb
      }
      
      table.dataTable.no-footer {
        border-bottom: 1px solid #111
      }
      
      table.dataTable.nowrap th,
      table.dataTable.nowrap td {
        white-space: nowrap
      }
      
      table.dataTable.compact thead th,
      table.dataTable.compact thead td {
        padding: 4px 17px
      }
      
      table.dataTable.compact tfoot th,
      table.dataTable.compact tfoot td {
        padding: 4px
      }
      
      table.dataTable.compact tbody th,
      table.dataTable.compact tbody td {
        padding: 4px
      }
      
      table.dataTable th.dt-left,
      table.dataTable td.dt-left {
        text-align: left
      }
      
      table.dataTable th.dt-center,
      table.dataTable td.dt-center,
      table.dataTable td.dataTables_empty {
        text-align: center
      }
      
      table.dataTable th.dt-right,
      table.dataTable td.dt-right {
        text-align: right
      }
      
      table.dataTable th.dt-justify,
      table.dataTable td.dt-justify {
        text-align: justify
      }
      
      table.dataTable th.dt-nowrap,
      table.dataTable td.dt-nowrap {
        white-space: nowrap
      }
      
      table.dataTable thead th.dt-head-left,
      table.dataTable thead td.dt-head-left,
      table.dataTable tfoot th.dt-head-left,
      table.dataTable tfoot td.dt-head-left {
        text-align: left
      }
      
      table.dataTable thead th.dt-head-center,
      table.dataTable thead td.dt-head-center,
      table.dataTable tfoot th.dt-head-center,
      table.dataTable tfoot td.dt-head-center {
        text-align: center
      }
      
      table.dataTable thead th.dt-head-right,
      table.dataTable thead td.dt-head-right,
      table.dataTable tfoot th.dt-head-right,
      table.dataTable tfoot td.dt-head-right {
        text-align: right
      }
      
      table.dataTable thead th.dt-head-justify,
      table.dataTable thead td.dt-head-justify,
      table.dataTable tfoot th.dt-head-justify,
      table.dataTable tfoot td.dt-head-justify {
        text-align: justify
      }
      
      table.dataTable thead th.dt-head-nowrap,
      table.dataTable thead td.dt-head-nowrap,
      table.dataTable tfoot th.dt-head-nowrap,
      table.dataTable tfoot td.dt-head-nowrap {
        white-space: nowrap
      }
      
      table.dataTable tbody th.dt-body-left,
      table.dataTable tbody td.dt-body-left {
        text-align: left
      }
      
      table.dataTable tbody th.dt-body-center,
      table.dataTable tbody td.dt-body-center {
        text-align: center
      }
      
      table.dataTable tbody th.dt-body-right,
      table.dataTable tbody td.dt-body-right {
        text-align: right
      }
      
      table.dataTable tbody th.dt-body-justify,
      table.dataTable tbody td.dt-body-justify {
        text-align: justify
      }
      
      table.dataTable tbody th.dt-body-nowrap,
      table.dataTable tbody td.dt-body-nowrap {
        white-space: nowrap
      }
      
      table.dataTable,
      table.dataTable th,
      table.dataTable td {
        box-sizing: content-box
      }
      
      .dataTables_wrapper {
        position: relative;
        clear: both;
        *zoom: 1;
        zoom: 1
      }
      
      .dataTables_wrapper .dataTables_length {
        float: left
      }
      
      .dataTables_wrapper .dataTables_length select {
        border: 1px solid #aaa;
        border-radius: 3px;
        padding: 5px;
        background-color: transparent;
        padding: 4px
      }
      
      .dataTables_wrapper .dataTables_filter {
        float: right;
        text-align: right
      }
      
      .dataTables_wrapper .dataTables_filter input {
        border: 1px solid #aaa;
        border-radius: 3px;
        padding: 5px;
        background-color: transparent;
        margin-left: 3px
      }
      
      .dataTables_wrapper .dataTables_info {
        clear: both;
        float: left;
        padding-top: .755em
        font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif !important;
      }
      
      .dataTables_wrapper .dataTables_paginate {
        float: right;
        text-align: right;
        padding-top: .25em
      }
      
      .dataTables_wrapper .dataTables_paginate .paginate_button {
        box-sizing: border-box;
        display: inline-block;
        min-width: 1.5em;
        padding: .5em 1em;
        margin-left: 2px;
        text-align: center;
        text-decoration: none !important;
        cursor: pointer;
        *cursor: hand;
        color: #333 !important;
        border: 1px solid transparent;
        border-radius: 2px
      }
      
      .dataTables_wrapper .dataTables_paginate .paginate_button.current,
      .dataTables_wrapper .dataTables_paginate .paginate_button.current:hover {
        color: #333 !important;
        border: 1px solid #979797;
        background-color: white;
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, white), color-stop(100%, #dcdcdc));
        background: -webkit-linear-gradient(top, white 0%, #dcdcdc 100%);
        background: -moz-linear-gradient(top, white 0%, #dcdcdc 100%);
        background: -ms-linear-gradient(top, white 0%, #dcdcdc 100%);
        background: -o-linear-gradient(top, white 0%, #dcdcdc 100%);
        background: linear-gradient(to bottom, white 0%, #dcdcdc 100%)
      }
      
      .dataTables_wrapper .dataTables_paginate .paginate_button.disabled,
      .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:hover,
      .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:active {
        cursor: default;
        color: #666 !important;
        border: 1px solid transparent;
        background: transparent;
        box-shadow: none
      }
      
      .dataTables_wrapper .dataTables_paginate .paginate_button:hover {
        color: white !important;
        border: 1px solid #111;
        background-color: #585858;
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #585858), color-stop(100%, #111));
        background: -webkit-linear-gradient(top, #585858 0%, #111 100%);
        background: -moz-linear-gradient(top, #585858 0%, #111 100%);
        background: -ms-linear-gradient(top, #585858 0%, #111 100%);
        background: -o-linear-gradient(top, #585858 0%, #111 100%);
        background: linear-gradient(to bottom, #585858 0%, #111 100%)
      }
      
      .dataTables_wrapper .dataTables_paginate .paginate_button:active {
        outline: none;
        background-color: #2b2b2b;
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #2b2b2b), color-stop(100%, #0c0c0c));
        background: -webkit-linear-gradient(top, #2b2b2b 0%, #0c0c0c 100%);
        background: -moz-linear-gradient(top, #2b2b2b 0%, #0c0c0c 100%);
        background: -ms-linear-gradient(top, #2b2b2b 0%, #0c0c0c 100%);
        background: -o-linear-gradient(top, #2b2b2b 0%, #0c0c0c 100%);
        background: linear-gradient(to bottom, #2b2b2b 0%, #0c0c0c 100%);
        box-shadow: inset 0 0 3px #111
      }
      
      .dataTables_wrapper .dataTables_paginate .ellipsis {
        padding: 0 1em
      }
      
      .dataTables_wrapper .dataTables_processing {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 40px;
        margin-left: -50%;
        margin-top: -25px;
        padding-top: 20px;
        text-align: center;
        font-size: 1.2em;
        background-color: white;
        background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(255, 255, 255, 0)), color-stop(25%, rgba(255, 255, 255, 0.9)), color-stop(75%, rgba(255, 255, 255, 0.9)), color-stop(100%, rgba(255, 255, 255, 0)));
        background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.9) 75%, rgba(255, 255, 255, 0) 100%);
        background: -moz-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.9) 75%, rgba(255, 255, 255, 0) 100%);
        background: -ms-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.9) 75%, rgba(255, 255, 255, 0) 100%);
        background: -o-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.9) 75%, rgba(255, 255, 255, 0) 100%);
        background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.9) 75%, rgba(255, 255, 255, 0) 100%)
      }
      
      .dataTables_wrapper .dataTables_length,
      .dataTables_wrapper .dataTables_filter,
      .dataTables_wrapper .dataTables_info,
      .dataTables_wrapper .dataTables_processing,
      .dataTables_wrapper .dataTables_paginate {
        color: #333
      }
      
      .dataTables_wrapper .dataTables_scroll {
        clear: both
      }
      
      .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody {
        *margin-top: -1px;
        -webkit-overflow-scrolling: touch
      }
      
      .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody>table>thead>tr>th,
      .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody>table>thead>tr>td,
      .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody>table>tbody>tr>th,
      .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody>table>tbody>tr>td {
        vertical-align: middle
      }
      
      .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody>table>thead>tr>th>div.dataTables_sizing,
      .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody>table>thead>tr>td>div.dataTables_sizing,
      .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody>table>tbody>tr>th>div.dataTables_sizing,
      .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody>table>tbody>tr>td>div.dataTables_sizing {
        height: 0;
        overflow: hidden;
        margin: 0 !important;
        padding: 0 !important
      }
      
      .dataTables_wrapper.no-footer .dataTables_scrollBody {
        border-bottom: 1px solid #111
      }
      
      .dataTables_wrapper.no-footer div.dataTables_scrollHead table.dataTable,
      .dataTables_wrapper.no-footer div.dataTables_scrollBody>table {
        border-bottom: none
      }
      
      .dataTables_wrapper:after {
        visibility: hidden;
        display: block;
        content: "";
        clear: both;
        height: 0
      }
      
      @media screen and (max-width: 767px) {
      
        .dataTables_wrapper .dataTables_info,
        .dataTables_wrapper .dataTables_paginate {
          float: none;
          text-align: center;
          font-family: "Google Sans", Roboto, "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif !important;
        }
      
        .dataTables_wrapper .dataTables_paginate {
          margin-top: .5em
        }
      }
      
      @media screen and (max-width: 640px) {
      
        .dataTables_wrapper .dataTables_length,
        .dataTables_wrapper .dataTables_filter {
          float: none;
          text-align: center
        }
      
        .dataTables_wrapper .dataTables_filter {
          margin-top: .5em
        }
      }
      </style>
      <table id="container" class="display" width="100%"></table>
      `;
  },
  updateAsync: function (data, element, config, queryResponse, details, done) {
    this.clearErrors();
    var dataRecords = generateDataRecords(data);
    var fieldNames = Object.keys(dataRecords[0])
    var queryResponseFieldsDimensions = queryResponse.fields.dimensions
    var queryResponseFieldsMeasures = queryResponse.fields.measures
    var fieldLabels = []
    
    fieldNames.forEach(d=>{
      fieldLabels.push(getFieldMetaInfoValue(queryResponse, d)[0]['label_short'])
    })

    var columnsDataTable = []
    fieldLabels.forEach(d=>{
      obj = {}
      obj['title'] = d
      columnsDataTable.push(obj)
    })

    var dataRows = generateHighChartsDataSeries(dataRecords);

    $("#container").DataTable({
      data: dataRows,
      columns: columnsDataTable,
      searching: false,
      // fixedHeader: false,
      select: false,
      colReorder: false,
      responsive: false,
      mark: false,
    });

    done();
  },
};

looker.plugins.visualizations.add(visObject);
