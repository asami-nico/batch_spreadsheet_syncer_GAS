# GAS
staffとsummaryのシートをS3にCSV出力します。

## スプレッドシートへの設定方法
#### GASの編集
DB同期用 → ツール → スクリプトエディタ

#### スクリプトプロパティ(オーナー権限必須)
ファイル → プロジェクトのプロパティ → スクリプトのプロパティ

* SPREADSHEET_NAME：スプレッドシート番号
* AWS_ACCESS_KEY：アクセスキー
* AWS_SECRET_ACCESS_KEY：シークレットアクセスキー
* BUCKET_NAME：バケット名

#### ライブラリの読み込み
リソース → ライブラリ → ポップアップ表示
以下の手順を実行

1. ライブラリを追加：MB4837UymyETXyn8cv3fNXZc9ncYTrHL9
2. 「追加」をクリック
3. バージョン4を選択
4. 「保存」をクリック

#### トリガー
* sheet1
現在のプロジェクトのトリガー → トリガーを追加 → イベントのソースを選択:時間主導型
* sheet2
手動で実行

## 処理概要

#### sheet1.gs
create_sheet1_csv()、get_values()、create_file()を作成しています。
create_sheet1_csv()で各関数を実行し、sheet1をcsv出力しています。

#### sheet2.gs
create_sheet2_csv()、get_sheet2_values()、create_sheet2_file()を作成しています。
create_sheet2_csv()で各関数を実行し、sheet2をcsv出力しています。

#### function.gs
sheet1.gsとsheet2.gsで使用する共通の関数を作成しています。

#### hash.gs
MD5でハッシュ化をするMD5()を作成しています。
作成したMD5()はsheet1で使用していて、該当データをハッシュ化しています。
