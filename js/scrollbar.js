/**
 * Created by sunqian on 2015/12/23.
 */

function scrollbar(){
    var $drag = $("#scrollInner");
    var $dragOuter = $("#scrollOuter");
    var $content = $("#contentInner");
    var $contentOuter = $("#content"),
        $scrollTop = $("#scrollTop"),
        $scrollBottom = $("#scrollBottom");
    var _outerHeight = $dragOuter.offsetHeight,
        dragHeight = $drag.offsetHeight,
        dragLong = _outerHeight - dragHeight,
        contentHeight = $content.offsetHeight,
        contentOuterHeight = $contentOuter.offsetHeight,
        scrollTopHeight = $scrollTop.offsetHeight,
        scrollBottomHeight = $scrollBottom.offsetHeight,
        minDragTop = scrollTopHeight,
        maxDragTop = _outerHeight - dragHeight - scrollTopHeight;
    /*鼠标移动事件*/
    $drag.onmousedown = function(ev){
        ev = ev || window.event;
        var initTop = ev.clientY - $drag.offsetTop;
        if($drag.setCapture){
            $drag.setCapture();
        }
        document.onmousemove = function(ev){
            ev = ev || window.event;
            var t = ev.clientY - initTop,
                ct  = $content.offsetTop;
            if(t<minDragTop){
                t = minDragTop;
                ct = 0;
            }else if(t>maxDragTop){
                t = maxDragTop;
                ct = -(contentHeight - contentOuterHeight) - 1;
            }else{
                ct = - (t-scrollTopHeight) / maxDragTop * (contentHeight - contentOuterHeight);
            }
            $drag.style.top = t + "px";
            $content.style.top =  ct + "px";
        };
        document.onmouseup = function(){
            document.onmousemove = document.onmouseup = null;
            if($drag.releaseCapture){
                $drag.releaseCapture();
            }
        };
        return false;
    };
    /*滚轮事件*/
    $contentOuter.onmouseover = function(){
        if($contentOuter.addEventListener){
            $contentOuter.addEventListener("DOMMouseScroll", wheelScroll, false);
        }
        $contentOuter.onmousewheel = wheelScroll;
        function wheelScroll(ev){
            ev = ev || window.event;
            var tag = true, t = $content.offsetTop, dt = $drag.offsetTop,
                minTop = -(contentHeight - contentOuterHeight + 1),
                dtDis = - maxDragTop * 100 / minTop;
            if(ev.wheelDelta){
                tag = ev.wheelDelta > 0 ? true : false;
            }else{
                tag = ev.detail < 0 ? true : false;
            }

            /*没滚动一次，按照100px翻滚内容*/
            if(tag){    //tag 为true，向上翻滚
                t = $content.offsetTop + 100;
                dt = $drag.offsetTop - dtDis;
                if(t>0){
                    t = 0;
                }
                if(dt<minDragTop){
                    dt = minDragTop;
                }
            }else{      //tag为false，向下翻滚
                t = $content.offsetTop - 100;
                dt = $drag.offsetTop + dtDis;
                if(t < minTop){
                    t = minTop;
                }
                if(dt>maxDragTop){
                    dt = maxDragTop;
                }
            }
            $content.style.top = t + "px";
            $drag.style.top = dt + "px";
            /*阻止默认事件*/
            if(ev.preventDefault){
                ev.preventDefault();
            }
            return false;
        }
    }
}

scrollbar();