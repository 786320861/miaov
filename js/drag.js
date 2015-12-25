/**
 * Created by sunqian on 2015/12/23.
 */

function drag(dom){
    dom.onmousedown = function(ev){
        ev = ev || event;
        var initLeft = ev.clientX - dom.offsetLeft,
            initTop = ev.clientY - dom.offsetTop;
        if(dom.setCapture){
            dom.setCapture();
        }
        document.onmousemove = function(ev){
            ev = ev || event;
            dom.style.top = ev.clientY-initTop + "px";
            dom.style.left = ev.clientX-initLeft + "px";
        };
        document.onmouseup = function(){
            document.onmousemove = document.onmouseup = null;
            if(dom.releaseCapture){
                dom.releaseCapture();
            }
        };
        return false;
    }
}

window.onload = function(){
    var $drag = $("#drag");
    drag($drag);
    var $img = $("#img1");
    drag($img);
    $test = $("#test");
    $test.onclick = function(){
        return false;
    }
};