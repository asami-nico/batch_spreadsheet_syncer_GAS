function create_sheet1_csv() {
  var properties = PropertiesService.getScriptProperties();  //Propertiesクラスのインスタンスを取得
  var sheets = get_sheet(properties)    //シート名を取得
  var data = get_values(sheets[0]);  //シートのデータを取得
  var csv = replace_break_iferror(data); //改行、エラー文字を削除
  var file_name = get_filename();
  var file = get_csvfile(csv,file_name);
  create_file(properties,file_name,file);  //返ってきた値をcreate_fileに渡す
}

function get_values(sheet1) {
  var lastRow = sheet1.getRange(2, 4).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow();  //D列最終行を取得
  var data = sheet1.getRange("A2:W"+ lastRow).getValues();
  return data;
}


function create_file(properties,file_name,file) {
  //指定したキーの値を取得
  var aws_access_key = properties.getProperty('AWS_ACCESS_KEY');
  var aws_secret_access_key = properties.getProperty('AWS_SECRET_ACCESS_KEY');
  var bucket_name = properties.getProperty('BUCKET_NAME');

  //S3に保存
  var s3 = S3.getInstance(aws_access_key, aws_secret_access_key);
  s3.putObject(bucket_name, 'sheet1.csv/'+ file_name, file, {logRequests:true} );
}