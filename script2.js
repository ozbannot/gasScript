function myFunction() {
let url = "https://news.livedoor.com/";
let html = UrlFetchApp.fetch(url).getContentText("EUC-JP");
let newsList = Parser.data(html)
.from("トップ/主要/トピックス/詳細']);\">")
.to("</a>")
.iterate();
//ログ出力でスクレイピング結果を表示する
console.log(newsList);
}
