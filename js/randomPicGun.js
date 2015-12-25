//function

/*
* 先测试图片的滚动效果
* */
function gun(dom, step, time){
    clearInterval(dom.gunTimer);
    exeGun();
    dom.gunTimer = setInterval(exeGun,time);
    function exeGun(){
        var imgOne = dom.getElementsByTagName("img")[0];
        var imgTwo = dom.getElementsByTagName("img")[1];
        var top1 = parseInt(getStyle(imgOne, "top")),
            top2 = parseInt(getStyle(imgTwo, "top"));
        //alert(top1)
        /*图片一，向上翻滚*/
        if(dom.tag){
            if(top1==-140){
                dom.tag = false;
                clearInterval(dom.gunTimer);
                return;
            }
            top1-=step;
            top2-=step;
        }
        /*图片一向下翻滚*/
        else{
            //top
            if(top1==0){
                dom.tag = true;
                clearInterval(dom.gunTimer);
                return;
            }
            top1+=step;
            top2+=step;
        }
        imgOne.style.top = top1 + "px";
        imgTwo.style.top = top2 + "px";
    }
}
function randomGun(){
    var lis = document.getElementsByClassName("newsLists")[0].getElementsByTagName("li");

    exeRandomGun();
    timer = setInterval(exeRandomGun, 500);
    function exeRandomGun(){
        var _random = getRange(1,lis.length);
        var li = lis[_random-1];
        gun(li, 2, 10);
    }
}

function getRange(min, max){
    return Math.round(Math.random()*(max-min) + min);
}
var lis = document.getElementsByClassName("newsLists")[0].getElementsByTagName("li"),len = lis.length;
for(var i=0;i<len;i++){
    lis[i].tag = true;
}
randomGun();