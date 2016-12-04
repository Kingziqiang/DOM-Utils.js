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
    }//Ҳ����try{}catch(e){}�����
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
      //����1
    /* function getCss(curEle,attr){
     var val = window.getComputedStyle? window.getComputedStyle(curEle,null)[attr] : curEle.currentStyle[attr];
     if(!isNaN(parseFloat(val))) val = parseFloat(val);
     return val;
     }*/
    // ����2
    function getCss(curEle, attr) {
        var val = "getComputedStyle" in window ? window.getComputedStyle(curEle, null)[attr] : curEle.currentStyle[attr];
        var temp = parseFloat(val);
        return isNaN(temp) ? val : temp;
    };

    /*
     // ����3
     function getCss(curEle,attr){
     var val = typeof window.getComputedStyle == "function" ? getComputedStyle(curEle,null)[attr] : curEle.currentStyle[attr];
     if(!isNaN(parseFloat(val))) val = parseFloat(val);
     return val;
     }
     // ����4
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
        with (curEle) {//���with���÷��������Ͱ�ele������ǰ���������ˣ�������дÿһ��CSS����֮ǰ��дele.��
            switch (attr) {
                case 'float'://����float�ļ���������
                    style['cssFloat'] = val;
                    style['styleFloat'] = val;
                    break;
                case 'opacity': //����͸���ȵļ���������
                    //�����Ӧ�ô���һ�£���Ϊopacity��ֵ�ǽ���0��1֮���
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
                    //��Щcss����ֵ���ص���Ƕ�����Ϊ���������Ի���max��������һ��
                    var reg= /^(-?\d+(?:\.\d+)?)(pt|px|em|in)?$/;
                    //����������Ҫ����һ�㣬�����жϴ�С����
                    if (reg.test(val)) {
                        var num = RegExp.$1;//ȡ����һ������
                        var unit = RegExp.$2;//ȡ���ڶ������飺��λ����
                        num = Math.max(0, num);//�����������ֵ�Ǹ���������0
                        if (unit)//����е�λ������ϵ�λ�����û�е�λ������pxΪĬ�ϵ�λ
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
                    //����������Ҫ����һ�㣬�����жϴ�С������.
                    //���������Դ�����2.5em,22px,22,3pt,-10.6in������css��λ
                    if (reg.test(val)) {
                        //������ϴ����������·�ʽ����
                        var num = RegExp.$1;
                        var unit = RegExp.$2;
                        if (unit)
                        //����Ǵ���λ�ģ�����ϵ�λ
                            val = num + unit;
                        else
                        //���������λ������Ĭ�ϵĵ�λpx
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
        //1 ��ȡhtml��߿���ϱ߿�ֱ������Ļ���������Ϸ��ľ���
        var bLeft = getCss(document.documentElement, "marginLeft"), bTop = getCss(document.documentElement, "marginTop");
        if (curEle == document.documentElement)  return {left: bLeft, top: bTop};
        //2 ��ȡbody��߿���ϱ߿�ֱ������Ļ���������Ϸ��ľ���
        var hLeft = getCss(document.documentElement, "marginLeft") + getCss(document.documentElement, "borderLeftWidth") + getCss(document.documentElement, "paddingLeft") + bLeft;
        var hTop = getCss(document.documentElement, "marginTop") + getCss(document.documentElement, "borderTopWidth") + getCss(document.documentElement, "paddingTop") + bTop;
        if (curEle == document.body) return {left: hLeft, top: hTop};
        var tempPar = par = curEle.parentNode, pos = getCss(par, "position");
        tempPar.style.position = "static";//����Ԫ��ͳһ����Ϊ����λ
        var totalLeft = curEle.offsetLeft, totalTop = curEle.offsetTop;
        if (/Firefox/.test(navigator.userAgent)) {
            totalLeft += getCss(document.documentElement, "marginLeft") - document.body.offsetLeft;
            totalTop += getCss(document.documentElement, "marginTop") - document.body.offsetTop;
        } else if (/(MSIE\s(8.0|9.0|10.0))|(rv:\d+\.\d\)\slike Gecko)/.test(navigator.userAgent)) {

        } else if (/MSIE\s(5.0|6.0|7.0)/.test(navigator.userAgent)) {
            while (par) { //ֱ��htmlΪֹ
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
        tempPar.style.position = pos;//�ָ�ԭ������ʽ
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
        // var strThis=str.replace(/\b\d\b/g, "0$&");�ַ���ƴ�ӣ����ܵ��÷���
        var strThis=str.replace(/\b\d\b/g, function () {
            return "0"+arguments[0];
        });
        strThis=strThis.replace(reg,function(){
            return RegExp.$1+"��"+RegExp.$2+"��"+RegExp.$3+"��"+" "+RegExp.$4+"��"+RegExp.$5+"��"+RegExp.$6+"��";
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



