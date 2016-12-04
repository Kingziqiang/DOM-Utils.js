/**
 * Created by Kingziqiang on 2016/9/26.
 *  With inert single mode in order to facilitate the future optimization and maintenance
 */
var Utils;
Utils = (function () {
    //win: Get or set the browser properties of the model;
    function win(attr, val) {
        var len = arguments.length;
        if (len === 0)return;
        if (len === 1) {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = val;
        document.body[attr] = val;
    }

    //listToAry: The type of array is converted into an array;
    function listToAry(likeAry) {
        var ary = [];
        try {
            return [].prototype.slice.call(likeAry, 0);
        } catch (e) {
            for (var i = 0, len = likeAry.length; i < len; i++) {
                ary[ary.length] = likeAry[i]
            }
        }
        return ary;
    }

    //toJson: The json string into a json object type;
    function toJson(jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval("(" + jsonTsr + ")");
    }//也可用try{}catch(e){}解决；
    //hasClassName: Determine whether the current element specifies the name of the class;
    function hasClassName(curEle, cName) {
        var reg = new RegExp("(^|\s+)" + cName + "($|\s+)");
        return reg.test(curEle.className);
    }

    //getElesByClassName: Elements in the name of the class;
    function getElesClassName(cName, context) {
        context = context || window;
        var allTags = context.getElementsByTagName("*"), ary = [];
        var cNameAry = cName.replace(/^\s+|\s+$/g, "").slice(/\s+/);
        for (var i = 0, len = allTag.length; i < len; i++) {
            var node = allTags[i], flag = true;
            for (var k = 0; k < cNameAry.length; k++) {
                var reg = new RegExp("(^|\s+)" + cNameAry[k] + "(\s+|$)");
                if (!reg.test(node.className)) {
                    flag = false;
                    break;
                }
            }
        }
        return flag ? ary[ary.length] = node : null;
    }

    //addClass: Increase the current element class names;
    function addClass(curEle, cName) {
        var cNameAry = cName.replace(/^\s+|\s+$/g, "").split(/\s+/);
        for (var i = 0, len = cNameAry.length; i < len; i++) {
            var cur = cNameAry[i];
            if (!this.hasClassName(curEle, cur)) {
                curEle.className += " " + cur;
            }
        }
    }

    //removeClass:Delete the current element class names;
    function removeClass(curEle, cName) {
        var cNameAry = cName.replace(/^\s+|\s+$/g, "").split(/\s+/);
        for (var i = 0, len = cNameAry.length; i < len; i++) {
            var cur = cNameAry[i];
            var reg = new RegExp("(^|\s+)" + cNameAry + "(\s+|$)", "g");
            if (this.hasClassName(curEle, cur)) {
                curEle.className = curEle.className.replace(reg, " ");
            }
        }
    }

    // getCss: Obtain the elements of style;
      //方法1
    /* function getCss(curEle,attr){
     var val = window.getComputedStyle? window.getComputedStyle(curEle,null)[attr] : curEle.currentStyle[attr];
     if(!isNaN(parseFloat(val))) val = parseFloat(val);
     return val;
     }*/
    // 方法2
    function getCss(curEle, attr) {
        var val = "getComputedStyle" in window ? window.getComputedStyle(curEle, null)[attr] : curEle.currentStyle[attr];
        var temp = parseFloat(val);
        return isNaN(temp) ? val : temp;
    };

    /*
     // 方法3
     function getCss(curEle,attr){
     var val = typeof window.getComputedStyle == "function" ? getComputedStyle(curEle,null)[attr] : curEle.currentStyle[attr];
     if(!isNaN(parseFloat(val))) val = parseFloat(val);
     return val;
     }
     // 方法4
     function getCss(ele,attr){
     var val = null;
     try{
     val = getComputedStyle(ele,null)[attr]
     }catch(e){
     val = ele.currentStyle[attr];
     }
     if(!isNaN(parseFloat(val))) val = parseFloat(val);
     return val;
     }*/
    //setCss:  Set the current styles inline element;
    function setCss(curEle, attr, val) {
        with (curEle) {//理解with的用法，这样就把ele当作当前的作用域了，不必在写每一个CSS属性之前再写ele.了
            switch (attr) {
                case 'float'://处理float的兼容性问题
                    style['cssFloat'] = val;
                    style['styleFloat'] = val;
                    break;
                case 'opacity': //处理不透明度的兼容性问题
                    //这儿还应该处理一下，因为opacity的值是介于0和1之间的
                    val = Math.max(0, val) && Math.min(1, val);
                    style['opacity'] = val;
                    style['filter'] = "alpha(opacity:" + val * 100 + ")";
                    break;
                case 'width':
                case 'height':
                case 'paddingLeft':
                case 'paddingBottom':
                case 'paddingTop':
                case 'paddingRight':
                case 'borderLeftWidth':
                case 'borderRightWidth':
                case 'borderTopWidth':
                case 'borderBottomWidth':
                    //这些css属性值的特点就是都不能为负数，所以会用max方法运算一下
                    var reg= /^(-?\d+(?:\.\d+)?)(pt|px|em|in)?$/;
                    //这个正则相对要完善一点，可以判断带小数的
                    if (reg.test(val)) {
                        var num = RegExp.$1;//取出第一个分组
                        var unit = RegExp.$2;//取出第二个分组：单位部分
                        num = Math.max(0, num);//如果传进来的值是负数，则用0
                        if (unit)//如果有单位，则加上单位，如果没有单位，则以px为默认单位
                            val = num + unit;
                        else
                            val = num + 'px';
                    }
                    style[attr] = val;
                    break;
                case 'marginLeft':
                case 'marginRight':
                case 'marginTop':
                case 'marginBottom':
                case 'right':
                case 'left':
                case 'top':
                case 'bottom':
                    var reg = /^(-?\d+(?:\.\d+)?)(pt|px|em|in)?$/;
                    //这个正则相对要完善一点，可以判断带小数的了.
                    //这个正则可以处理象：2.5em,22px,22,3pt,-10.6in这样的css单位
                    if (reg.test(val)) {
                        //如果符合此正则，则按以下方式处理
                        var num = RegExp.$1;
                        var unit = RegExp.$2;
                        if (unit)
                        //如果是带单位的，则加上单位
                            val = num + unit;
                        else
                        //如果不带单位，则用默认的单位px
                            val = num + 'px';
                    }
                    style[attr] = val;
                    break;
                default:
                    style[attr] = val;
            }
        }
    }
    //setGroupCss: Set the current batch inline styles;
    function setGroupCss(curEle, object) {
        if (({}).toString.call(object) == "[object Object]") {
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    this.setCss(curEle, key, object[key]);
                }
            }
        }
    }

    //attr: Settings or access to current attribute of the element;
    function attr(curEle, property, value) {
        var len = arguments.length;
        if (len <= 1)return;
        if (len === 2) {
            return property === "class" ? curEle.className : curEle.getAttribute(property);
        }
        property === "class" ? curEle.className = value : curEle.setAttribute(property, value);
    }

    //removeAttr: Delete the current element properties;
    function removeAttr(curEle, property) {
        var len = arguments.length;
        if (len <= 1)return;
        property === "class" ? curEle.className = null : curEle.removeAttribute(property);
    }

    //html: Get or set the content of the current element;
    function html(curEle, val) {
        var len = arguments.length;
        if (len === 0)return;
        if (len === 1) {
            return chrEle.innerHTML;
        }
        curEle.innerHTML = val;
    }

    // val:Get or set the value of the current form element values
    function val(curEle, val) {
        var len = arguments.length;
        if (len === 0)return;
        if (len === 1) {
            return chrEle.value;
        }
        curEle.value = val;
    }

    function offset(curEle) {
        //1 获取html左边框和上边框分别距离屏幕最左侧和最上方的距离
        var bLeft = getCss(document.documentElement, "marginLeft"), bTop = getCss(document.documentElement, "marginTop");
        if (curEle == document.documentElement)  return {left: bLeft, top: bTop};
        //2 获取body左边框和上边框分别距离屏幕最左侧和最上方的距离
        var hLeft = getCss(document.documentElement, "marginLeft") + getCss(document.documentElement, "borderLeftWidth") + getCss(document.documentElement, "paddingLeft") + bLeft;
        var hTop = getCss(document.documentElement, "marginTop") + getCss(document.documentElement, "borderTopWidth") + getCss(document.documentElement, "paddingTop") + bTop;
        if (curEle == document.body) return {left: hLeft, top: hTop};
        var tempPar = par = curEle.parentNode, pos = getCss(par, "position");
        tempPar.style.position = "static";//将父元素统一设置为不定位
        var totalLeft = curEle.offsetLeft, totalTop = curEle.offsetTop;
        if (/Firefox/.test(navigator.userAgent)) {
            totalLeft += getCss(document.documentElement, "marginLeft") - document.body.offsetLeft;
            totalTop += getCss(document.documentElement, "marginTop") - document.body.offsetTop;
        } else if (/(MSIE\s(8.0|9.0|10.0))|(rv:\d+\.\d\)\slike Gecko)/.test(navigator.userAgent)) {

        } else if (/MSIE\s(5.0|6.0|7.0)/.test(navigator.userAgent)) {
            while (par) { //直到html为止
                totalLeft += curEle.clientLeft + par.offsetLeft;
                totalTop += curEle.clientTop + par.offsetTop;
                curEle = par;
                par = par.offsetParent;
            }
            totalLeft += document.body.clientLeft + bLeft;
            totalTop += document.body.clientTop + bTop;
        } else {
            totalLeft += getCss(document.documentElement, "marginLeft");
            totalTop += getCss(document.documentElement, "marginTop");
        }
        tempPar.style.position = pos;//恢复原来的样式
        return {left: totalLeft, top: totalTop};
    }

    //queryURLParameter:
    function queryURLParameter(str) {
        var reg = /(^[=&?])=([=&?])$/g,obj={};
            obj=str.replace(reg,function(){
                abj[argument[1]]=argument[2];
            })
        return obj;
    }
    //myExec:
    function myExec(str,reg){
        var reg=reg.global?eval(reg.toString()+"g"):reg;
        var ary=[],res=reg.exec(str);
        while(res){
            ary[ary.length]=res[0];
            res=reg.exec(str);
        }
        return ary.length===0?null:ary;
    }
    //myFormatTime
    function myFormatTime(str) {
        var reg = /^(\d{4})(?:[\/.-:\s+])(\d{1,2})(?:[\/.-:\s+])(\d{1,2})(?:\s+)(\d{1,2})(?:[\/.-:\s+])(\d{1,2})(?:[\/.-:\s+])(\d{1,2})$/g;
        // var strThis=str.replace(/\b\d\b/g, "0$&");字符串拼接，不能调用方法
        var strThis=str.replace(/\b\d\b/g, function () {
            return "0"+arguments[0];
        });
        strThis=strThis.replace(reg,function(){
            return RegExp.$1+"年"+RegExp.$2+"月"+RegExp.$3+"日"+" "+RegExp.$4+"秒"+RegExp.$5+"分"+RegExp.$6+"秒";
        });
        return strThis;
    }
    return {
        win: win,
        listToAry: listToAry,
        toJson: toJson,
        hasClassName: hasClassName,
        getElesByClassName: getElesClassName,
        addClass: addClass,
        removeClass: removeClass,
        getCss: getCss,
        setCss: setCss,
        setGroupCss: setGroupCss,
        attr: attr,
        removeAttr: removeAttr,
        html: html,
        val: val,
        offset: offset,
        queryURLParameter:queryURLParameter,
        myExec:myExec,
        myFormatTime:myFormatTime



    }
})();



