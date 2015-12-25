/**
 * Created by sunqian on 2015/12/16.
 */

function appendFont(){
    var $newStr = $("#fontIpt"),
        newStr = $newStr.value,
        nLen = newStr.length,
        ni = '',
        bgi = '',
        $showStr = $("#showFont"),
        type = parseInt($("#fontChose").value),
        imgArr = ["../img/balloon.png","../img/star.png","../img/heart.png","../img/moon.png"];
    if(type>=0){
        for(var i=0;i<nLen;i++){
            ni = newStr.charAt(i);
            bgi = imgArr[type];
            ni = "<span style='text-align:center;width:53px;height:48px;display:inline-block;background:url("+bgi+") no-repeat center;'>"+ni+"</span>";
            $showStr.innerHTML+=ni;
        }
    }else{
        $showStr.innerHTML+=newStr;
    }
    $newStr.value = '';
}

$("#ok").onclick = function(){
    appendFont();
};