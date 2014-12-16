// VerbalQuiz
// Copyright (c) 2014 KosukeSera
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php


function　btns2(){
    $('#rslt').on('click','button',function(){
      $(this).hide();
      $(this).next().show();
      $(this).prev().show();
     });

    $('#showedit').click(function(){
      $('#rsltarea').hide();
      $('#editarea').show();
     });
}

//読込は関数定義だけしておきます
  function shwrslt(arr){
  var rslttbl = "";
  var rsltdata = arr;
  var numtrue = 0;
  var numcnt = 0;
    for (i = 0; i < rsltdata.length; i++) {
        var j = i+1
        console.log(i);
        rslttbl = "";
      rslttbl += "<tr id=\"rslt\">\n";
         rslttbl += "<td id=\"Qst\">";
         rslttbl += "(" + j.toString() +")" + rsltdata[i]['question'];
         rslttbl += "</td>\n";

         rslttbl += "<td id=\"Ans\">";
         rslttbl += rsltdata[i]['answer'];
         rslttbl += "</td>\n";

         rslttbl += "<td id=\"userans\">";
         rslttbl += rsltdata[i]['userA'];
         rslttbl += "</td>\n";

         rslttbl += "<td id=\"tf\" class=\"tf\">";
            var mya = rsltdata[i]['userA'];
            var rta = rsltdata[i]['answer'];
            var flg1="";
            var flg2="";
         //正誤判定
          if(mya.indexOf(rta)==-1){
            // rslttbl += "×";
            flg1="style=\"display:none\"";
            console.log("NG");
          }else{
            numtrue++;
            // rslttbl += "○";
            flg2="style=\"display:none\"";
            console.log("OK");
          }
            numcnt++;
         rslttbl += "<button type=\"button\" id=\"ok\" class=\"btn btn-sm btn-success ok\" "+flg1+">○</button>";
         rslttbl += "<button type=\"button\" id=\"ng\" class=\"btn btn-sm btn-danger ng\" "+flg2+">×</button>";

         rslttbl += "</td>\n";
      rslttbl += "</tr>\n";
      $("#rslts").append(rslttbl);
      btns2();
    };
    $("#numcnt").text(numcnt);
    $("#numtrue").text(numtrue);

}


//おまじない
$(function(){
btns2();
});
