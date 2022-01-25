var generateDataRecords = (dataIndexFormat) => {
  //HELP: convert looker response data into common records format
  //NOTE: used by metrics-widget__big-number
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

function getFieldMetaInfoValue(queryResponse, fieldName) {
  //HELP: look up meta info of looker fields
  // @queryResponse: looker Response
  // @fieldName: viewName.fieldTechicalName
  // @return: array of metainfo of this field
  const queryResponseFieldsDimensions = queryResponse.fields.dimensions
  const queryResponseFieldsMeasures = queryResponse.fields.measures

  f_dimension = queryResponseFieldsDimensions.filter(d=>{
    return d.name == fieldName
  })

  f_measure = queryResponseFieldsMeasures.filter(d=>{
    return d.name == fieldName
  })

  var f = f_dimension.length == 0 ? f_measure : f_dimension

  return f
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