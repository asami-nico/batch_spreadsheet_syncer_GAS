# GAS
staffとsummaryのシートをS3にCSV出力します。

## スプレッドシートへの設定方法
[DB同期用スプレッドシート](https://docs.google.com/spreadsheets/d/16RfbBJpZsDoxAcePvasHZlhhsFffl-wp6XEBgJMeOZo/edit?usp=sharing)

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
* summary
現在のプロジェクトのトリガー → トリガーを追加 → イベントのソースを選択:時間主導型
* staff
手動で実行

## 処理概要

#### staff.gs
create_staff_csv()、get_staff_values()、create_staff_file()を作成しています。
create_staff_csv()で各関数を実行し、staffシートをcsv出力しています。

#### summary.gs
create_summary_csv()、get_values()、create_file()を作成しています。
create_summary_csv()で各関数を実行し、summary同期用シートをcsv出力しています。

#### function.gs
staff.gsとsummary.gsで使用する共通の関数を作成しています。

#### hash.gs
MD5でハッシュ化をするMD5()を作成しています。
作成したMD5()はsummary同期用シートのW列で使用していて、氏名と電話番号をハッシュ化しています。