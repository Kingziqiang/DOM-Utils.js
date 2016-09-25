var DOM;
    DOM= (function () {
    //children:Get all the elements of the current element child nodes;
    function children(curEle, strTag) {
        var nodes = curEle.childNodes, ary = [];
        strTag = strTag.toUpperCase();
        for (var i = 0, len = nodes.length; i < len; i++) {
            var node = nodes[i];
            if (arguments.length == 1) {
                if (node.nodeType === 1) {
                    ary[ary.length] = node[i];
                }
            }
            if (arguments.length == 2 && typeof strTag == "string") {
                if (node.nodeType === 1 && node.tagName == strTag) {
                    ary[ary.length] = node[i];
                }
            }
        }
        return ary;
    }
    //prev:Access to the current element's elder brother element node;
    function prev(curEle) {
        var prev = curEle.previousSibling;
        if (cur.previousElementSibling) {
            return curEle.previousElementSibling;
        }
        while (prev) {
            if (prev && prev.nodeType!== 1) {
                prev = prev.previousSibling;
            }
        }
        return null;
    }
    //nxt: Access to the current element's younger brother element node;
    function nxt (curEle){
        var nxt=curEle.nextSibling;
        if(curEle.nextElementSibling){
            return curEle.nextElementSibling;
        }
        while(nxt){
            if(nxt&&nxt.nodeType!==1){
                nxt=nxt.nextSibling;
            return nxt;
            }
        }
        return null;
    }
    //sibling: Access to the current element of the adjacent sibling node;
    function sibling(curEle) {
        var pre = this.prev(curEle), next = this.nxt(curEle), ary = [];
        pre ? ary[ary.length] = pre : null;
        next ? ary[ary.length] = next : null;
        return ary;
    }
    //prevAll: Get all the elder brother of the current element element node
    function prevAll(curEle){
        var pre=this.prev(curEle),ary=[];
        while(pre){
            ary.push(pre);
            pre=this.prev(pre);
        }
        return ary;
    }
    //nxtAll: Get all the younger brother of the current element element node
    function nxtAll(curEle){
        var nxt=this.nxt(curEle),ary=[];
        while(nxt){
            ary.push(nxt);
            nxt=this.nxt(nxt);
        }
        return ary;
    }
    //getIndex: Access to the current element index;
    function getIndex(curEle){
        return this.prevAll(curEle).length;
    }
   /* function getIndex(curEle){
        var count=0;
        var prev=curEle.previousSibling;
        while(prev&&prev.nodeType==1){
            count+=1;
            prev=prev.previousSibling;
        }
        return count;
    }*/
    //first: Gets the current element to the first child node;
    function first(curEle){
        var fir=this.children(curEle);
        return  fir.length>0?fir[0]:null;
    }
    //last: Gets the current element to the last child node;
    function last(curEle){
        var lst=this.children(curEle);
        return  lst.length>0?lst[lst.length-1]:null;
    }
    //append: Add elements to the container terminal;
    function append(newEle,container){
        container.appendChild(newEle);
    }
    //prepend: Add elements to the top of the container;
    function prepend(curEle,container){
        var fir=this.first(curEle);
        fir?container.insertBefore(curEle,fir):container.appendChild(curEle);
    }
    //insertBefore: Add elements before the current element;
    function insertBefore(newEle,oldEle){
        var par=oldEle.parentNode;
       par.insertBefore(newEle,oldEle);
    }
    //insertAfter: Add elements after the current element;
    function insertAfter(newEle,oldEle){
        var par=oldEle.parentNode,next=this.nxt(oldEle);
        next?par.insertBefore(newEle,oldEle):par.appendChild(oldEle);
    }

    return {
        children: children,
        prev: prev,
        nxt: nxt,
        sibling: sibling,
        prevAll: prevAll,
        nxtAll: nxtAll,
        getIndex: getIndex,
        first: first,
        last: last,
        append: append,
        prepend: prepend,
        insertBefore: insertBefore,
        insertAfter: insertAfter
    }
})();
