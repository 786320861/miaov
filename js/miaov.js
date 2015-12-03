/**
 * Created by sunqian on 2015/12/2.
 */
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