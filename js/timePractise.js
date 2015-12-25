/*倒计时*/
function eachCount() {
    var $button = $(".beginCount"),
        len = $button.length,
        $text = $(".beginTime"),
        $show = $(".countShow");
    for (var i = 0; i < len; i++) {
        (function (index) {
            $button[index].onclick = function () {
                this.index = index;
                countDown(this,$text[index].value,  $show[index], outStock);
            }
        })(i);
    }
}

function countDown(self,newDate, $dom, endFn) {

    clearInterval($dom.timer);
    var date = new Date(),
        nd = new Date(newDate);
    var distance = Math.floor((nd - date)/1000);
    if(distance>0){
        exeCountDown();
        $dom.timer = setInterval(exeCountDown, 1000);
    }else{
        $dom.innerHTML = "0天0时0分0秒";
    }
    function exeCountDown(){
        date = new Date();
        distance = Math.floor((nd - date)/1000);
        var day = Math.floor(distance/(24*60*60)),  //转成天
            hour = Math.floor(distance%(60*24*60) / 3600), //小时
            minute = Math.floor(distance%(60*24*60*3600) / 60), //分钟
            second = Math.floor(distance%(60*24*60*3600) % 60), //秒
            str = day + "天" + hour + "时" + minute + "分" + second + "秒";
        if(distance<=0){
            clearInterval($dom.timer);
            endFn && endFn(self);
        }
        $dom.innerHTML = str;
    }
}

/*
* 倒计时结束，商品下架到下面
* */
function outStock(self){
    var $li = $("#goodsList").getElementsByClassName("Inner")[self.index]; //获取父元素
    $li.style.position = "absolute";
    var arr = [];
    for(var i=20; i > 0;i-=2){
        arr.push(i, -i);
    }
    arr.push(0);
    shock($li, arr,changeOpacity);
}

function shock($dom, arr, endFn){
    var index = 0,
        ai = arr[index];
    $dom.shock = setInterval(function(){
        if(!(index == arr.length)){
            $dom.style.left = ai + "px";
            index++;
            ai = arr[index];
        }else{
            clearInterval($dom.shock);
            endFn && endFn($dom);
        }

    }, 100);
}
function changeOpacity($dom){
    clearInterval($dom.opacityTimer);
    var degree = 0.9,
        top = 0;
    $dom.opacityTimer = setInterval(function(){
        if(degree>=0){
            $dom.style.opacity = degree;
            $dom.style.top = top + "px";
            degree -= 0.1;
            top += 20;
        }else{
            clearInterval($dom.opacityTimer);
            setBottom($dom);
        }
    }, 30);
}

function setBottom($dom){
    var $sellArea = $(".sellArea")[0],
        innerHtml = $sellArea.getElementsByTagName("tbody")[0].innerHTML;
    var $description = $dom.getElementsByClassName("description")[0],
        desText = $description.innerText.substring(0,20),
        price = $dom.getElementsByTagName("mark")[0].innerText.substring(1),
        img = $dom.getElementsByTagName("img")[0].src;
    var str = "<tr><td>"+desText+"</td><td>"+price+"</td><td><img src='"+img+"'></td></tr>";
    $sellArea.innerHTML = innerHtml + str;
    var $totalPrice = $(".totalPrice")[0].getElementsByTagName("span")[0];
    console.log($totalPrice.innerHTML);
    var totalPrice = parseInt($totalPrice.innerHTML, 10);
    totalPrice = parseInt(price) + totalPrice;
    $totalPrice.innerHTML = totalPrice;
}
eachCount();
