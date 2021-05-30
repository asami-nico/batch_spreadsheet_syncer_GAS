function create_sheet2_csv() {
  var properties = PropertiesService.getScriptProperties();  //Propertiesクラスのインスタンスを取得
  var sheets = get_sheet(properties);
  var data = get_sheet2_values(sheets[1]);
  var csv = replace_break_iferror(data);
  var file_name = get_filename();
  var file = get_csvfile(csv,file_name);
  create_sheet2_file(properties, file_name, file);
}

function get_sheet2_values(sheet2) {
  var lastRow = sheet2.getRange(1, 1).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow();    //データがある最終行を取得
  var data = sheet2.getRange("A2:E"+ lastRow).getValues();
  return data;
}

function create_sheet2_file(properties, file_name, file) {
  //指定したキーの値を取得
  var aws_access_key = properties.getProperty('AWS_ACCESS_KEY');
  var aws_secret_access_key = properties.getProperty('AWS_SECRET_ACCESS_KEY');
  var bucket_name = properties.getProperty('BUCKET_NAME');

  var s3 = S3.getInstance(aws_access_key, aws_secret_access_key);
  s3.putObject(bucket_name, 'sheet2.csv/'+ file_name, file, {logRequests:true} );
}