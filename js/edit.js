// VerbalQuiz
// Copyright (c) 2014 KosukeSera
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

var examdata=[];
var exam = [];
function　btns1(){
 $('#append').click(function (){
   var origin = $('#origin');
   var clone = origin.clone();
   $('#exam').append(clone.attr('class','quiz').attr('id','quiz'));

 });

 $('#exam').on('click','.rm',function(){
   var cur_tr = $(this).closest('td').parent();
   cur_tr.hide('2000', function(){ cur_tr.remove(); });
 });

 $('#save').click(function(){
    var examdata=[];
    //一番左上のマスが空欄なら怪しむ
    //問題データ生成。
    var badQ = false;
     $('.quiz').each(function(i){
        examdata[i] = [];
        var Q = $('#Q',this).val();
        console.log(Q);
        if(Q==""){
          alert("問題がきちんと入力されていません！");
          badQ = true;
          return;
        }
        examdata[i]['question'] = Q;
        examdata[i]['answer'] = $('#A',this).val();
     });
   //問題に問題がなければ(つまり、問題があれば)examareaを表示
   if(badQ){
    return;
   }else{
   $('#editarea').hide();
   $('#examarea').show();
   exam = examdata;
   }
 });

}

//読込は関数定義だけしておきます
//loadexam(jsondata)で、返ってきたものをeditのjsonここ！のとこに。
 //  function loadexam(arr){
	// var examtbl = "";
	// var examdata = arr;
 //      for (i = 0; i < examdata.length; i++) {
 //      examtbl += "<tr id=\"quiz\">\n";
 //         examtbl += "<td><input class=\"form-control\" type=\"text\" id=\"Q\" value=\"";
 //         examtbl += examdata[i]['question'];
 //         examtbl += "\"></td>\n";

 //         examtbl += "<td><input class=\"form-control\" type=\"text\" id=\"A\" value=\"";
 //         examtbl += examdata[i]['answer'];
 //         examtbl += "\"></td>\n";

 //         examtbl += "<td><input class=\"form-control\" type=\"text\" id=\"id\" value=\"";
 //         examtbl += examdata[i]['id'];
 //         examtbl += "\"></td>\n";

 //         examtbl += "<td><button type=\"button\" class=\"btn btn-md btn-default rm\" id=\"rm\">削除</button></td>";
 //      examtbl += "</tr>\n";
 //      }
 //      $('#exam').append(examtbl);
 //      btns1();
 //  };



//おまじない
$(function(){
btns1();

//おまじない
});