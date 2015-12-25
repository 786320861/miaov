/**
 * Created by sunqian on 2015/12/10.
 */
function extend(parent,child){
    var F = function(){};
    F.prototype = parent;
    F.prototype.constructor = F;
    child.prototype = new F();
}

function parent(name, sex){
    this.name = name;
    this.sex = sex;
}
function _child(name,sex){
    //parent.call(this, name,sex);
}

function _extend(p, _c){
    for(var attr in p.prototype){
        _c.prototype[attr] = p.prototype[attr];
    }
}


parent.prototype.sayName = function(){
    alert(this.name);
};

_extend(parent, _child);
var cc = new _child("sq", 23);


var a = {x:1,y:2};
b = a;
b.x = 3;

function a(x,y){
    this.x = x;
    this.y = y;
}
var copyA = new a(2,3);

function extend2(p,c){
    for(var attr in p){
        c[attr] = p[attr];
    }
}