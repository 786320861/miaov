/**
 * Created by sunqian on 2015/12/9.
 */
function tab(){
    var tabLi = $(".tabHead")[0].getElementsByTagName("li"),
        inputsArea = $(".sectionOne"),
        len = tabLi.length,
        tabAltLi = $(".dropDown")[0].getElementsByTagName("li"),
        conArea = $(".conArea")[0];
    for(var i=0;i<len;i++){
        (function(i){
            tabLi[i].onclick = function(){
                exeTab(this,i);
            };
            tabAltLi[i].onclick = function(){
                var state = getStyle(conArea, "display");
                if(state=="none"){
                    conArea.style.display = "block";
                }
                exeTab(tabLi[i],i);
            }
        })(i);
    }
    function exeTab(dom,i){
        for(var j=0;j<len;j++){
            tabLi[j].className = '';
            inputsArea[j].style.display = 'none';
        }
        inputsArea[i].style.display = "block";
        dom.className = "active";
    }
}

function dropDown(){
    var showDrop = $(".showDrop")[0],
        dropDown = $(".dropDown")[0];
    var tag = true;
    showDrop.onclick = function(event){
        event = event || window.event;
        event.stopPropagation ? event.stopPropagation() : (event.returnValue = false);
        if(tag){
            dropDown.style.display = "block";
        }else{
            dropDown.style.display = "none";
        }
        tag = !tag;
    };
    document.onclick = function(){
        dropDown.style.display = "none";
        tag = true;
    }
}
function search(){
    var $str = $(".textArea")[0],
        str = $str.innerHTML,
        $alt = $(".sectionOne")[0].getElementsByTagName("input")[0],
        alt = $alt.value,
        $btn = $(".sectionOne")[0].getElementsByTagName("button")[0],
        altArr = [], altStr = '';
    $btn.onclick = function(){
        alt = $alt.value;
        altArr = str.split(alt);
        altStr = altArr.join("<span style='background: yellow'>"+alt+"</span>");
        $str.innerHTML = altStr;
        $alt.value = '';
    }
}

function replace(){
    var $str = $(".textArea")[0],
        str = $str.innerHTML,
        $alt = $(".sectionOne")[1].getElementsByTagName("input")[0],
        alt = '',
        $rel = $(".sectionOne")[1].getElementsByTagName("input")[1],
        rel = '',
        $btn = $(".sectionOne")[1].getElementsByTagName("button")[0],
        altArr = [], altStr = '';
    $btn.onclick = function(){
        alt = $alt.value;
        rel = $rel.value;
        if(alt == ""){
            alert("请输入需要替换的内容");
            return ;
        }
        if(rel==""&&str.indexOf(alt)!=-1){
            var _confirm = confirm("确定删除“" + alt+"”？");
            if(_confirm){
                $str.innerHTML = str.split(alt).join("");
                alt.value = '';
            }
        }else{
            altArr = str.split(alt);
            altStr = altArr.join(rel);
            $str.innerHTML = altStr;
            $alt.value = '';
            $rel.value = '';
        }
    }
}
window.onload = function(){
    tab();
    dropDown();
    search();
    replace();
};
