$(function () {
    var div1 = $("#div1"),
        op = div1.getElementsByTagName("p")[0],
        oimg = div1.getElementsByTagName("img")[0],
        oul = div1.getElementsByTagName("ul")[0],
        oli = oul.getElementsByTagName("li"),
        index = 0,
        $prev = $("#prev"),
        $next = $("#next"),
        timer = null;
    var imgArr = ["../img/1.jpg", "../img/2.jpg", "../img/3.jpg", "../img/4.jpg"],
        imgAl = imgArr.length;
    for (var i = 0; i < imgAl; i++) {
        oul.innerHTML += "<li></li>";
    }
    oli[0].setAttribute("class", "active");
    function tabImg() {
        oimg.src = imgArr[index];
        oimg.index = index;
        op.innerHTML = index + 1 + "/" + imgAl;
        for (var i = 0; i < imgAl; i++) {
            oli[i].className = "";
        }
        oli[index].className = "active";
    }

    tabImg();
    /*小图点击显示相应的图片*/
    for (var j = 0; j < oli.length; j++) {
        oli[j].index = j;
        oli[j].onclick = function () {
            index = parseInt(this.index, 10);
            tabImg();
        };
        oli[j].onmouseover = function () {
            clearInterval(timer);
        };
        oli[j].onmouseout = function () {
            startTab();
        };
    }
    /*上一张图*/
    $prev.onclick = function () {
        index--;
        if (index < 0) {
            index = imgAl - 1;
        }
        tabImg();
    };
    /*下一张图*/
    function showNext() {
        index++;
        index %= imgAl;
        tabImg();
    }

    $next.onclick = function () {
        showNext();
    };
    /*定时器开*/
    function startTab(){
        timer = setInterval(function () {
            showNext();
        }, 3000);
    }
    startTab();
    /*移动到图片上去时，清除定时器*/
    oimg.onmouseover = function(){
        clearInterval(timer);
    };
    oimg.onmouseout = function(){
        startTab();
    }
});