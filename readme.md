#VerbalQuiz

##ライセンス
MITライセンスで公開しています。LICENSE.txtを参照のこと。  
This software is released under the MIT License, see LICENSE.txt.  

##Web Speech API
本作品は、Web Speech APIを使っています。  
https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html  
現在Web Speech APIに対応しているブラウザは下記のとおりです。  
http://caniuse.com/#feat=web-speech  

##これは何？  
先日、NPO法人manaveeのメンバーでハッカソンに出場し、  
"Runnig&Learning"という、走りながら学習を可能にするサービスを作りました。  
その過程でWeb Speech APIについて勉強したので、その成果のまとめです。  
タイムショック的なクイズゲームを作って楽しむことができます。  

###デモ
こちらでデモを確認できます。
http://iscre.am/VerbalQuiz

##内容物
■html  

* **index.html** :以下の3つの部分に分かれています。Webアプリ等に組み入れる際にはそれぞれを別ファイルに分割することをオススメします。  
	+ editarea : 問題と解答を入力  
	+ examarea : (メイン)テキスト読み上げと音声認識によるクイズ  
	+ rsltarea : 成績判定  

■js

* **edit.js** : editareaにおいて動作。
* **exam.js** : examareaにおいて動作。
* **rslt.js** : rsltareaにおいて動作。

■その他

* bootstrap
* jquery-1.10-2

##使い方
###準備
exam.jsのsetTimeoutの時間は適宜調整してください。  
また、現状、音声認識、読み上げ共にja-JPで指定してありますが、  
サポートされている限りでの他の言語においても使用することができます。  

###問題の作成
画面の指示に従って問題と解答を加えていき、完了したらスタートを押すと問題が始まります。

###問題の再生
スタートボタンを押すと、音声で指示が流れます。  
ブラウザ上部にマイクへの接続を許可するボタンが出てくるので押してください。  
(許可を求める表示が出てこない場合は適宜ググってください)  
マイクがオンの状態で「OK」と言うと問題がスタートします。  
各問、次の問題が始まる前に答えてください。  

###成績の判定  
結果の一覧が表示されます。  
日本語の音声認識は勝手に漢字に変換してしまうことがあり、  
正確な正誤判定ができない可能性があるため、手動での採点も可能にしています。  
(ただし、得点の記録などはおこなっていないため、このアプリ自体においては採点は意味をもちません)  
問題の編集、を押すと、examとrsltをhideしてeditをshowします。  
新規の問題を作成、を押すとページをリロードします。  

