// VerbalQuiz
// Copyright (c) 2014 KosukeSera
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php


//examdata = editからきたやつ
var exam=examdata;
// var exam = JSON.parse($('#hoge').text());

//言語設定
//読み上げ
var ttslg = "ja-JP";
//認識
var reclg = "ja-JP";

//outputするarray 各列についてQ,A,userA,remフラグ
var rslt=[];

//音声認識部分
var rec = new webkitSpeechRecognition();
     rec.continuous = true;
     rec.lang = reclg;
     //中間結果の表示オン
     rec.interimResults = true;

//話し声の認識中
rec.onsoundstart = function(){
    $("#state").text("認識中");
};
//マッチする認識が無い
rec.onnomatch = function(){
    $("#state").text("何語?");
};
//エラー
rec.onerror= function(){
    $("#state").text("エラー!!!");
};
//話し声の認識終了
rec.onsoundend = function(){
    $("#state").text("停止中");
};


//テキスト読み上げ部分
var tts = new SpeechSynthesisUtterance();
    tts.volume = 1;
    tts.rate = 1;
    tts.pitch = 2;
    tts.lang =  ttslg;
    tts.onend = function (event) {
        console.log('speech end. time=' + event.elapsedTime + 's');
    }

//開始宣言の読み上げ
function spch0(tx){
    tts.text = tx;
    speechSynthesis.speak(tts);
}

//音声認識したものはresults配列に格納され続けるので、
//新しいものを取得するには今までの数をカウントしてforをまわす
var numrs = 0;

//それぞれの問題の読み上げ
function spch(tx,cnt){
    //問題読み上げ時
    rslt[cnt] = '';
    tts.onstart = function (event) {
        console.log('speech start. time=' + event.elapsedTime + 's');
      //問題読み上げ時、解答の音声読み上げが
      rec.onresult = function (event) {
         var interimText = '';
         var results = event.results;
         //results[0]から[numrs]までは前問までの音声認識結果
        for (var i = numrs; i < results.length; i++) {
         // isFinalがtrueの場合は確定した内容
         // 仕様書では「final」という変数名だが、Chromeでは「isFinal」
         if (results[i].isFinal) {
               finalText = results[i][0].transcript;
               $("#userA").text(finalText);
               rslt[cnt] += finalText + ",";
               console.log(rslt[cnt]);
               numrs ++;
          } else {
               interimText += results[i][0].transcript;
          }
         }
      }
    }

    tts.text = tx;
    speechSynthesis.speak(tts);

}

//(メイン！！！)問題まわすところ
var cnt = 0;
var isRunning; //ストップフラグ

//最初はOKが聞こえたらスタートする
rec.onresult = function (event) {
    rslt[0] = '';
    var interimText = '';
    var results = event.results;
    for (var i = 0; i < results.length; i++) {
     // isFinalがtrueの場合は確定した内容
     // 仕様書では「final」という変数名だが、Chromeでは「isFinal」のようです.
      if (results[i].isFinal) {
           finalText = results[i][0].transcript;
           rslt[0] += finalText + ",";
           console.log(rslt[0]);
           //格納されたOKを次回以降表示しないように。
           numrs++;
           if(finalText=="ok"){  
              start2();
           }
      } else {
           interimText += results[i][0].transcript;
      }
    }
};

//スタートボタンの挙動
function start(){
  rec.start();
  console.log("start");
  var rdy = "マイクの接続を許可して、かっこよくOKと言ってください。";
  spch0(rdy);
};

//okが聞こえたら実行
function start2(){
  $("#start").hide();
  $("#stop").show();
  isRunning = true;
  cnt = 0;
  var stvoice="問題をはじめます。はりきっていきましょう";
  spch0(stvoice);
  quiz();
};

//再開ボタンの挙動
function resume(){
  console.log("resume");
  isRunning = true;
  $("#resume").hide();
  $("#stop").show();
  rec.start();
  quiz();
};

//全問終わった時の挙動
function done(){
      console.log(rslt);
      rec.stop();

    //成績を二次元配列に整形
    var finalData = [];
    for (var j = 0; j < exam.length; j++) {
        finalData[j] = {'question' : exam[j]['question'], 'answer' : exam[j]['answer'], 'userA' : rslt[j]};
    };

    $("#examarea").hide();
    $("#rsltarea").show();
    console.log(finalData);
    shwrslt(finalData);
     // //ajaxでデータを渡す
     //  $.post({
     //      url : "result",     //！！！postするurlを入れて！！！！
     //      data : {result: JSON.stringify(finalData)},
     //      dataType : 'JSON',
     //      scriptCharset: 'utf-8',
     //      success : function(data) {
     //          // Success
     //          alert("答え合わせをします");
     //          window.location.href = 'result';
     //      },
     //      error : function(data) {
     //          // Error
     //          alert("エラーです。通信環境のよいところでやり直してください。");
     //      }
     //  });
}

//一定時間ごとにクイズを出す
function quiz() {
  if (! isRunning) return;   // 繰り返しの終了条件
  if (cnt >= exam.length){
   done();
  }else{
  console.log(cnt);
  thisQ = exam[cnt]["question"];
  console.log(thisQ);
  var j=cnt+1
  var num = "第" + j.toString() + "問";
  $('#num').text(num);
  $("#thisQ").text(thisQ);
  spch(thisQ,cnt);

  cnt++;
  setTimeout(quiz, '8000');
  }
};

//ストップボタンの挙動
function stop() {
  console.log("stop");
  rec.stop();
  isRunning = false;
  $("#stop").hide();
  $("#resume").show();
};

