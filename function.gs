function replace_break_iferror(data) {
  var csv = "";
  //データ内の改行とエラー文字を削除
  for (var i = 0; i < data.length; i++){
    for (var k = 0; k < data[i].length; k++){
      data[i][k] = data[i][k].toString().replace(/[\r\n]+/g,"");
      data[i][k] = data[i][k].toString().replace('#REF!',"");
    }
    csv += data[i].join(',') + '\n' ;
  }return csv;
}

function get_sheet(properties) {
  var sheet_name = properties.getProperty( 'SPREADSHEET_NAME' );  //指定したキーの値を取得
  var ss = SpreadsheetApp.openById(sheet_name);
  var sheet1 = ss.getSheetByName('sheet1名称');  //シートのオブジェクトを取得
  var sheet2 = ss.getSheetByName('sheet2名称');  //シートのオブジェクトを取得

  var sheets = [sheet1, sheet2];
  return sheets;
}

function get_filename() {
  var date = new Date();  //現在の日時を取得
  var file_name = Utilities.formatDate( date, 'Asia/Tokyo', 'yyyyMMddHHmmss') + ".csv";
  return file_name;
}

function get_csvfile(csv,file_name) {
  var content_type = "text/csv";
  var blob = Utilities.newBlob("", content_type, file_name);
  var file = blob.setDataFromString(csv, "UTF-8");
  return file;
}