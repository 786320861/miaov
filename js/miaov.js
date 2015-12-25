/**
 * Created by sunqian on 2015/12/2.
 */
/*去除空格*/
function trim(str){
    return str.replace(/^\s*|\s*$/,"");
}

/*
* 检验数组中是否含有某个元素
* 只用来检验字符串。
* */
function arrIndexOf(arr, item){
    for(var i=0;i<arr.length;i++){
        if(trim(arr[i]) === item){
            return i;
        }
    }
    return -1;
}

/*简易的$方法*/
function $(arg){
    if(typeof arg === "function"){
        window.onload = arg;
    }else if(typeof arg === "string"){
        if(/^#/.test(arg)){
            return document.getElementById(arg.substring(1));
        }else if(/^\./.test(arg)){
            return document.getElementsByClassName(arg.substring(1));
        }
    }else if(typeof arg === "object"){
        return arg;
    }
}

/*根据className获取元素*/
function getElementsByClassName(parentNode, tagName, className){
    var obj = parentNode.getElementsByTagName(tagName),
        len = obj.length,
        reqObj = [];
    for(var i=0; i<len; i++){
        var objI = obj[i],
            classes = objI.className.split(" "),
            l = classes.length;
        for(var j=0; j<l; j++){
            if(trim(classes[j])==className){
                reqObj.push(objI);
                break;
            }
        }
    }
    return reqObj;
}
/*添加className*/
function addClass(obj, className){
    var oldClass = trim(obj.className);
    if(oldClass == ""){
        obj.className = className;
    }else{
        var index = arrIndexOf(obj.className.split(" "), className);
        if(index==-1){
            obj.className += " " + className;
        }
    }
}
/*移除className*/
function removeClass(obj, className){
    var oldClass = trim(obj.className);
    if(oldClass!=""){
        var classArr = obj.className.split(" ");
        var index = arrIndexOf(classArr, className);
        if(index!=-1){
            classArr.splice(index,1);
            obj.className = classArr.join(" ");
        }
    }
}

/*绑定事件*/
function bindEvent(obj, evtName, fn){
    if(obj.addEventListener){
        obj.addEventListener(evtName, fn, false);
    }else{
        obj.attachEvent("on"+evtName, function(){
            fn.call(obj);
        });
    }
}

/*
* 试用条件：1》已经定义的css。 属性2》不是复合属性
* */
function getStyle(obj, attr){
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

/*左右，或者上下晃动*/
function shock($dom, attr,max, endFn){
    var initVal = parseInt(getStyle($dom, attr));
    initVal = initVal ? initVal : 0;
    var arr = [];
    for(var i = max; i > 0;i-=1){
        arr.push(i+initVal, initVal-i);
    }
    arr.push(initVal);
    var index = 0,
        ai = arr[index];
    $dom.shock = setInterval(function(){
        if(!(index == arr.length)){
            $dom.style[attr] = ai + "px";
            index++;
            ai = arr[index];
        }else{
            clearInterval($dom.shock);
            endFn && endFn($dom);
        }
    }, 50);
}
function getDomPos(dom){
    var pos = {
        "top": 0,
        "left": 0
    };
    var domParent = dom;
    while(domParent){
        pos["top"] += domParent.offsetTop;
        pos["left"] += domParent.offsetLeft;
        domParent = domParent.offsetParent;
    }
    return pos;
}