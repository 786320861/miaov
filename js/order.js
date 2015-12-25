/**
 * Created by sunqian on 2015/12/16.
 */
/*
* 默认从小到大进行排序
* */

function order(dom){
    var val = dom.innerHTML;
    var $lists = $("#lists"),
        $orders = $lists.getElementsByTagName("span"),
        $imgs = $lists.getElementsByTagName("img"),
        orders = [], imgs = [], len = $imgs.length,str ='';
    for(var i = 0; i < len; i++){
        orders.push({
            "o":  parseInt($orders[i].innerHTML),
            "i": $imgs[i].src
        });
    }
    orders = orders.reverse();

    for(var j=0;j<len;j++){
        str += "<li><span class='order'>"+orders[j]["o"]+"</span><img src='"+orders[j]["i"]+"'></li>";
    }
    $lists.innerHTML = str;
    if(val == "从大到小"){
        dom.innerHTML = "从小到大";
    }else{
        dom.innerHTML = "从大到小";
    }
}

/*随机数*/
function randomNumber(min, max){
    return Math.round(Math.random()*(max-min) + min);
}
function randomArr(arr){
    return arr.sort(function(a,b){
        return Math.random()-0.5;
    });
}

/*
* 去除数组中的重读的数方法一
* */
function distinct(arr){
    var len = arr.length;
    for(var i=0;i<arr.length;i++){
        for(var j=i+1; j<arr.length;j++){
            if(arr[i] == arr[j]){
                arr.splice(j,1);
                j--;
            }
        }
    }
    return arr;
}
function distinct2(arr){
    var len = arr.length,altArr = [],hash = {};
    for(var i=0;i<len;i++){
        if(!hash[arr[i]]){
            hash[attr[i]] = true;
            altArr.push(arr[i]);
        }
    }
    return altArr;
}
/*
* 随机排列数组中的数，取得一个 0--arrL-1的随机数组，数组中不能有重复的数字
* */
function random(){
    var $lists = $("#lists"),
        $orders = $lists.getElementsByTagName("span"),
        $imgs = $lists.getElementsByTagName("img"),
        orders = [], len = $imgs.length,str ='';
    for(var i = 0; i < len; i++){
        orders.push({
            "o":  $orders[i].innerHTML,
            "i": $imgs[i].src
        });
    }
    orders = randomArr(orders);
    for(var j=0;j<len;j++){
        str+="<li><span class='order'>"+orders[j]["o"]+"</span><img src='"+orders[j]["i"]+"'></li>";
    }
    $lists.innerHTML = str;
}
window.onload = function(){
    var $orderBtn = $("#orderBtn"),
        $randomBtn = $("#randomBtn");
    $orderBtn.onclick = function(){
        order(this);
    };
    $randomBtn.onclick = function(){
        random();
    };
};
