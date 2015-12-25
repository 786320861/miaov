/*随机数*/
function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


var $begin = $("#begin");
$begin.onclick = function(){
    beginDropImages();
};

/*开始掉落图片*/
function beginDropImages(){
    clearInterval(window.dropTimer);
    window.score = 0;
    window.missScore = 0;
    window.dt = 2000;
    dropImages();
    window.dropTimer = setInterval(dropImages,window.dt);
}

function dropImages(){
    var id = randomNumber(100000,200000);
    var imgArr = ["../img/ball.png", "../img/bell.png", "../img/dear.png", "../img/gift.png", "../img/misletoe.png", "../img/snow.png", "../img/sock.png", "../img/stars.png", "../img/tree.png"],
        len = imgArr.length, randomNum = '', imgI = '',$imgI = null,
        $dropDown = $(".playGame")[0];
    var left = randomNumber(2,950);
    randomNum = randomNumber(0, len - 1);
    imgI = imgArr[randomNum];
    $imgI = document.createElement("img");
    $imgI.id = id;
    $imgI.src = imgI;
    $imgI.style.left = left + "px";
    $dropDown.appendChild($imgI) ;
    $imgI.onclick = function(){
        if(this.className == "disabled"){
            return;
        }
        clickTarget($imgI);
    };
    $imgI.initTop = -48;
    $imgI.downTimer = setInterval(function(){
        if($imgI.initTop == 598){
            clearInterval($imgI.downTimer);
            miss($imgI);
            return ;
        }
        $imgI.initTop += 1;
        $imgI.style.top = $imgI.initTop+"px";
    },10);
}
/*点中某个图片的操作*/
function clickTarget($img){
    var $playGame = $(".playGame")[0];
    clearInterval($img.downTimer);
    $img.src = "../img/depression.png";
    $img.className = "disabled";
    shock($img,"left",5,function(){
        shock($img,"top",5,function(){
            $img.parentNode.removeChild($img);
            var $score = $("#scoreShow");
            window.score++;
            $score.innerHTML = score;
            if(window.score >= 10){
                alert('游戏成功！');
                clearInterval(window.dropTimer);
                $playGame.innerHTML="";
                $score.innerHTML = "0";
                $("#missShow").innerHTML = "0";
                window.missScore = 0;
                window.score = 0;
            }
        });
    });
}
/*漏掉点击的函数*/
function miss($img){
    var $missMark = $("#missShow");
    var $playGame = $(".playGame")[0];
    window.missScore++;
    var $dom = $(".gameArea")[0];
    clearInterval($dom.shock);
    shock($dom,"top", 10, function(){
        $img.parentNode.removeChild($img);
        $missMark.innerHTML = window.missScore;
        if(window.missScore >= 10){
            clearInterval(window.dropTimer);
            alert("挑战失败，请重新开始吧！");
            $playGame.innerHTML="";
            $("#scoreShow").innerHTML = "0";
            $missMark.innerHTML = "0";
            window.missScore = 0;
            window.score = 0;
        }
    });
}