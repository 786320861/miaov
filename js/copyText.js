/**
 * Created by sunqian on 2015/12/9.
 */
function copyText() {
    var $text = $(".textArea")[0].getElementsByTagName("textarea")[0],
        text = '',
        $copyArea = $(".copyArea")[0],
        $p = $(".pageP")[0],
        $li = $(".clearfix")[0].getElementsByTagName("li");
    $(".beginCopy")[0].onclick = function () {
        var self = this;
        text = $text.value;
        $copyArea.innerHTML = "";
        if(text.length<=0){
            return;
        }
        self.disabled = true;
        $(".clearfix")[0].style.display = "block";
        var totalLen = text.length,
            perLen = 0;
        $p.innerHTML = perLen +'/' + totalLen;
        clearInterval(self.copyTimer);
        self.copyTimer = setInterval(function () {
            text = $text.value;
            if (text=="") {
                clearInterval(self.copyTimer);
                $(".clearfix")[0].style.display = "none";
                $p.innerHTML = '';
                self.disabled = false;
                return;
            }
            perLen = totalLen - text.length;
            for(var i = 0;i<$li.length;i++){
                $li[i].className = '';
            }
            $li[perLen%($li.length)].className = "active";
            $p.innerHTML = perLen+"/"+totalLen;
            $text.value = text.substring(1);
            $copyArea.innerHTML += text.substring(0, 1);
        }, 10);
    };

}

copyText();