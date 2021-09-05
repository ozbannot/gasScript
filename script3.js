// 定数の宣言（カレンダーID、カレンダーオブジェクト、追加するカレンダーのタイトル、場所）
const calendarId = '{カレンダーID}';
const calendar = CalendarApp.getCalendarById(calendarId);
const title = '{タイトル}';
const location = '{場所}';
const option = {'location':location};

// キャッシュ周りの定数（保存時間、関数、キーとして使用するフラグの値）
const cacheTime = 21600;
const cache = makeCache();
const EoLFlgs = ['E', 'L'];

// GETでのアクセス時に対応
function doGet(e){
  var EoLFlg = e.parameter.EoLFlg;

  // EoLFlgが E 又は Lの時に起動
  if( EoLFlgs.indexOf(EoLFlg) != -1){
    var date = new Date();
    cache.put(EoLFlg, Utilities.formatDate( date, 'Asia/Tokyo', 'YYYY/MM/dd H:m:s'));

    switch(EoLFlg){
      // E：入室時 念の為退室時刻のキャッシュをクリア
      case "E":
      cache.put('L', null);
      break;

      // L:退室時 入室時刻 < 退室時刻 となっていればカレンダーに追加
      case 'L':
      var startTime = cache.get(EoLFlgs[0]);
      var endTime = cache.get(EoLFlgs[1]);
      cacheClear();
      if( startTime < endTime ){
        var result = calendar.createEvent(title, new Date(startTime), new Date(endTime), option);
      }else{
        return HtmlService.createTemplateFromFile('ERROR').evaluate();
      }
      break;
    }
    return HtmlService.createTemplateFromFile('success'+EoLFlg).evaluate();
  }
}

// キャッシュの保存・取得をする関数 ※Qiitaからの引用（https://qiita.com/golyat/items/ba5d9ce38ec3308d3757）
function makeCache() {
  const cache = CacheService.getScriptCache();
  return {
    get: function(key) {
      return JSON.parse(cache.get(key));
    },
    put: function(key, value) {
      cache.put(key, JSON.stringify(value), cacheTime);
      return value;
    }
  };
}

// キャッシュクリア用関数
function cacheClear(){
  // それぞれのキャッシュをクリア
  for(var i = 0; i < EoLFlgs.length; i++){
    cache.put(EoLFlgs[i], null);
  }
}
