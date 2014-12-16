// VerbalQuiz
// Copyright (c) 2014 KosukeSera
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php


function　btns2(){
    $('#rslts').on('click','button',function(){
      $(this).hide();
      $(this).next().show();
      $(this).prev().show();

      var tf_flg = $(this).attr('id');
      var sumtrue = Number($("#numtrue").text());
        if(tf_flg=="ok"){
          sumtrue = sumtrue - 1;
        }else{
          sumtrue = sumtrue + 1;
        };
      $("#numtrue").text(sumtrue);
    });

    // $('#showedit').click(function(){
    //   $('#rsltarea').hide();
    //   $('#editarea').show();
    //  });
}

function sumtrue(){
  $(".numtrue").each(function(i){  
    $(this).text().to
    });
}


//読込は関数定義だけしておきます
  function shwrslt(arr){
  var rslttbl = "";
  var rsltdata = arr;
  var sumtrue = 0;
  var sumquiz = 0;
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
            sumtrue++;
            // rslttbl += "○";
            flg2="style=\"display:none\"";
            console.log("OK");
          }
            sumquiz++;
         rslttbl += "<button type=\"button\" id=\"ok\" class=\"btn btn-sm btn-success ok\" "+flg1+"><b>○</b></button>";
         rslttbl += "<button type=\"button\" id=\"ng\" class=\"btn btn-sm btn-danger ng\" "+flg2+"><b>×</b></button>";
         rslttbl += "</td>\n";
      rslttbl += "</tr>\n";
      $("#rslts").append(rslttbl);
      // btns2();
    };
    $("#numcnt").text(sumquiz);
    $("#numtrue").text(sumtrue);

}


//おまじない
$(function(){
btns2();
});
