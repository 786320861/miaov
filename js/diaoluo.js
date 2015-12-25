/**
 * Created by sunqian on 2015/12/3.
 */
$(function () {
    var dl = $(".diaoluo"),
        len = dl.length;
    for (var i = 0; i < len; i++) {
        dl[i].style.left = 50 + i * 60 + "px";
    }
    window.tag = true;
    window.switchs = true;
    document.onclick = function () {
        diaoluo();
    };
    function diaoluo() {
        var index = 0;
        var doDown = null;
        clearInterval(doDown);
        var startTop = 100,
            endTop = 500;
        if(window.tag){
            endTop = 500;
            window.tag = false;
        }else{
            endTop = startTop;
            window.tag = true;
        }
        if(window.switchs){
            window.switchs = false;
            doDown = setInterval(function(){
                moveToPos(dl[index], "top", 12, endTop,30);
                index++;
                if(index == len){
                    clearInterval(doDown);
                    window.switchs = true;
                }
            },100);
        }
    }

    function moveToPos(obj, attr, speed, pos, interval, endFn) {
        clearInterval(obj.timer);
        init = parseInt(getStyle(obj, attr));
        var distance = init;
        if (init > pos) {
            speed = -speed;
        }
        obj.timer = setInterval(function () {
            distance += speed;
            if (distance < pos && speed < 0 || distance > pos && speed > 0) {
                distance = pos;
            }
            obj.style[attr] = distance + "px";
            if (distance == pos) {
                clearInterval(obj.timer);
                endFn && endFn();
            }
        }, interval);
    }
});


/*window.onload = function(){
 var test = $(".test");
 var len = test.length,
 div = $(".div");

 for (var i = 0; i < len; i++) {
 test[i].index = i;
 div[i].style.display = "none";
 test[i].onclick = function () {
 var _self = this;
 for (var j = 0; j < len; j++) {
 test[j].className = "test";
 }
 this.className = "test active";
 div[_self.index].style.display = "block";
 }
 }
 };*/

/*function Tab(tab1, tab2){
 this.tabs = tab1;
 this.changes = tab2;
 this.len = tab1.length;
 }
 Tab.prototype.init = function(){
 var _self = this,
 l = _self.len,
 tabs = _self.tabs,
 tab0 = tabs[0],
 changes = _self.changes;
 tab0.className = tab0.className + " " +"active";
 for(var i=0;i<l;i++){
 tabs[i].index = i;
 changes[i].style.display = "none";
 //this.tabs[i].onclick = this.change.apply(this.tabs[i]);
 tabs[i].onclick = function(){
 var index = this.index;
 for(var i = 0; i < l; i++){
 changes[i].style.display = "none";
 tabs[i].className = tabs[i].className.replace("active","");
 }
 this.className = this.className + " " + "active";
 changes[index].style.display = "block";
 }
 }
 };

 var test = new Tab($(".test"), $(".div"));
 test.init();*/
/*tab.prototype.change = function(){
 var index = this.index;
 for(var i=0;i<this.len;i++){
 this.changes[i].style.display = "none";
 }
 this.className = this.className+ " " + "active";

 };*/
/**/
