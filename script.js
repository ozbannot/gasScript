function birthdayPostSlack()
{
  var birthDayNameList = getBirthDayNameList();
  for (var i = 0; i < birthDayNameList.length; i++) {
    var name = birthDayNameList[i][0];
    var birthDay = birthDayNameList[i][1];
    var nowDate = Utilities.formatDate(new Date(), 'Asia/Tokyo','MM/dd');
    if(nowDate == Utilities.formatDate(new Date(birthDay), 'Asia/Tokyo','MM/dd')) {
      sendHttpPost(name);
    }
  }
}

function getBirthDayNameList() 
{
  var ss = SpreadsheetApp.openById('hoge');
  var sheet = ss.getSheetByName("birthday"); // 誕生日リストを取得するシート名
  var last_row = sheet.getRange("A:A").getLastRow();
  var start_row = 2;　// 開始行
  var birthDayNameList = [];
  for (var i = start_row; i < last_row; i++) {
    var slack_name = sheet.getRange(i, 1).getValue();
    var birthDay = sheet.getRange(i, 2).getValue();
    if (slack_name != "") {
      birthDayNameList.push([slack_name, birthDay]);    
    }
  }
  return birthDayNameList;
}

/*
// 画像
function getRandomImageID() {
  var imageFileArray = [
    "1h9-4VB3UVsl-WmhjD2mh_YwJq6eaSCDa",
    "1uo3ACQWwVdUIgDhAeLZOPGsJFmOvq_Xk",
  ];

  // 0～7の値を取得
  var randomValue = Math.floor( Math.random() * 2 );
  
  return imageFileArray[randomValue];
}
*/


function sendHttpPost(name){
  //アクセストークンを設定
  var token = ["fuga"];
  //LINE Notifyに送るリクエストを設定
  var options =
   {
     "method"  : "post",
     "payload" : {"message": "今日は"　+ name + "さんの誕生日です♪" + '\r\n' + "おめでとうございます" + "\uDBC0\uDC76"
                  }, 
     "headers" : {"Authorization" : "Bearer "+ token}

   };

   //リクエスト送信
   UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}
