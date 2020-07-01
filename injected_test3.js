    const vh = 1/2 * Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const vw = 1/2 * Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    //document.body.style.paddingTop = ""+vh+"px"//vh
    //document.body.style.paddingBottom = ""+vh+"px"//vh
    //document.body.style.marginTop = ""+vh+"px"//vh
    document.body.style.marginBottom = ""+vh+"px"//vh
    let propTop = 0


    function allowDropMoj(ev) {
    ev.preventDefault();
  }

  function dragMoj(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  function dropMoj(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    console.log('dropped ', ev.target, ' ', document.getElementById(data))
    //ev.target.appendChild(document.getElementById(data));
  }



  var style = document.createElement('style');
  style.innerHTML = `
        img.fixedLike {
	all: initial;
        background-color: yellow;
	    z-index: 2147483646;
        }
        img.fixedDislike {
	all: initial;
        margin-left: 68;
        background-color: yellow;
	    z-index: 2147483646;
        }
        img.fixedComment {
	all: initial;
        margin-left: 136;
        background-color: yellow;
	    z-index: 2147483646;
        }
        img.fixedShare {
	all: initial;
        margin-left:204;
        background-color: yellow;
	    z-index: 2147483646;
        }
        div.imgHolder {
        	all: initial;
            position: fixed;
            display: flex;
            flex-direction: row;
            bottom: 0;
            width: 100%;
            background-color: grey;
	    z-index: 2147483647;
        }
	div#touchHolder{
	all: initial;	    
        position: absolute;
	    width:10px;
	    height:10px;
	    background-color: #f00;
	    z-index: 2147483646;
	}
	
	#anchorTop{
	all: initial;	    
        position: absolute;top: -5000px;left: 50px;
	    width:30px;
	    height:30px;
	    background-color: #ff0;
	    z-index: 2147483646;
	}

	#anchor{
	all: initial;	    
        position: fixed;top: 0px;right: 0px;
	    width:30px;
	    height:30px;
	    background-color: #ff0;
	    z-index: 2147483646;
	}

	.validDropTargetMoj{
        }

	.dropbox{
	all: initial;
        height: 200px;
		width: 200px;
		border:1px solid grey;
		display: inline-block;
		position: relative;
	}

    .absolute {
		position: absolute;
	}
	#draggable {
	    all: initial;
            height:150px;
	    width:150px;
	    background-color:#ccc;
	}
	.hiddenElems {
		visibility: hidden;
	}
        `

  document.head.appendChild(style);

    const touchHolder = document.createElement("div");
    touchHolder.id= "touchHolder"
    document.body.appendChild(touchHolder)
	
    const anchor = document.createElement("div");
    anchor.id= "anchor"
    document.body.appendChild(anchor)

    let scrollFetchTimerId = null
    const msgToFetchData = () => {
        console.log('anchor.offsetTop , vw = ', anchor.offsetTop, vw)
        console.log('ver1 elements at 50% width:\n',document.elementsFromPoint(anchor.offsetTop, vw))
        strAnchor = (anchor.style.top+"").replace('px','')
        console.log('anchor.style.top withoutpx , vw = ', strAnchor, vw)
        console.log('ver2 elements at 50% width:\n',document.elementsFromPoint(parseInt(anchor.style.top), vw))

        //let endPointViewPort= {x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY}
        //let endPoint= {x: event.changedTouches[0].pageX, y: event.changedTouches[0].pageY}
        //console.log("end points are ", endPoint, endPointViewPort)
        //let endTargets = document.elementsFromPoint(endPointViewPort.x, endPointViewPort.y);

        //Step0: Calculate the position
        //Step1: Find the element where the pointer is pointing to currently
        //Step2: Extract the text component like another place (beware in DB we're saving the whole thing, not just text without spaces)
        //Step3: Msg react native with this element; the rest will be automatically taken care of in the on message routine.
    }

    document.addEventListener('scroll',ev=>{
        if(scrollFetchTimerId !== null){
            clearTimeout(scrollFetchTimerId);
            console.log('Cancelled timer')
        }
        //window.scrollTo(window.pageXOffset , window.pageYOffset+vh)
	    //console.log('top = ',propTop,' ,vh=', vh,' offset=', window.pageYOffset)
        if(window.pageYOffset<vh){
		    propTop = Math.min(vh, window.pageYOffset)
        }else{
            propTop = vh
        }	    
        anchor.style['top'] = ""+propTop+"px"
        //record last time of scroll.
        //half second after call another function and log to console
        scrollFetchTimerId = setTimeout(msgToFetchData, 2000);
    })


    const anchorTop = document.createElement("div");
    anchorTop.id= "anchorTop"
    document.body.appendChild(anchorTop)

    const UIComponent = (title, src, parent) => {
        const imgItem = document.createElement("img");
        imgItem.src = src;
        imgItem['draggable']= "true";
        imgItem.addEventListener('dragstart', dragMoj)
        imgItem.id= "drag"+title;
        imgItem.className= "fixed"+title;
        imgItem['width']= "64";
        imgItem['height']= "64";
        
        const divItem =  document.createElement("div");
        divItem['width']= "64";

        const pItem = document.createElement("p");
        pItem.innerHTML = title

        parent.appendChild(divItem)
        divItem.appendChild(pItem)
        divItem.appendChild(imgItem)
        return {div:divItem, p: pItem, img: imgItem}
    }


    const imgHolder = document.createElement("div");
    imgHolder.className= "imgHolder";

    comps = {
        Like: UIComponent('Like', "https://humblebumblebee.github.io/likeIcon.png", imgHolder),
        Dislike: UIComponent('Dislike', "https://humblebumblebee.github.io/dislikeIcon.png", imgHolder),
        Comment: UIComponent('Comment', "https://humblebumblebee.github.io/commentIcon.png", imgHolder),
        Share: UIComponent('Share', "https://humblebumblebee.github.io/shareIcon.png", imgHolder),
    } 


    const imgLike = comps.Like.img
    const imgDislike = comps.Dislike.img
    const imgComment = comps.Comment.img
    const imgShare = comps.Share.img

    document.body.appendChild(imgHolder)
    
    //document.body.appendChild(imgLike)
    //document.body.appendChild(imgComment)
    //document.body.appendChild(imgShare)



    console.log(comps.Like.img)
    console.log(document.getElementById('dragLike'))
    console.log(document.getElementById('dragComment'))

    //document.getElementById("dragLike").addEventListener("drag", displayDate);


    /*
        const attrs = term =>{
            let attr = {
                draggable: "true",
                onDragStart: "drag(event)",
                id: "drag"+term,
                className: "fixed"+term,
                width: "64",
                height: "64",
            }
            return attr
        }
        for(let img of [{n:imgLike, w:'Like'}, imgComment, imgShare])
        for(let attr in attrs('Like')) {
            console.log(attr)
            imgLike[attr] = attrs[attr]
            console.log(imgLike)
        }
        for(let attr in attrs('Comment'))
            imgComment[attr]=attrs[attr]
        for(let attr in attrs('Share'))
            imgShare[attr]=attrs[attr]
    */



let modePreTagAllDroppableElements = false
if(modePreTagAllDroppableElements){
    const findElemsWithLargeText = root =>{
        const myfilter= node => {
            if (node.parentNode.tagName == 'SCRIPT')
                return NodeFilter.FILTER_SKIP;

            if (node.data.length>20) //filter out terms less than 20 DIV and IMG elements
                return NodeFilter.FILTER_ACCEPT;

            return NodeFilter.FILTER_SKIP;
        }

        let n
        let a=[] 

        let walk = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            myfilter,
            false
        );
        while(n=walk.nextNode()){
            a.push(n);
        }
        
        //Go back to the first child node of the collection and alert it
        walk.currentNode=document.body //reset TreeWalker pointer to point to root node

        return {nodes: a, walk:walk}
    }


    let nodesAndWalk = findElemsWithLargeText(document.body)

    for(n of nodesAndWalk.nodes){
        n.parentNode.addEventListener("drop", dropMoj)
        n.parentNode.addEventListener("dragover", allowDropMoj)
        n.parentNode.className+=" validDropTargetMoj "
    }
    console.log(nodesAndWalk.nodes,'\n-----------------\n')
    console.log(nodesAndWalk.nodes.map(item => item.data))

}






        /* here is where the touch stuff starts*/
    const onTouchMoveParam = (event, draggable) => {
          
            if(!draggable.className.includes(" absolute ")){
                // make the element draggable by giving it an absolute position and modifying the x and y coordinates
                draggable.className = draggable.className + " absolute ";
                // put the draggable into the wrapper, because otherwise the position will be relative of the parent element
                //wrapper.appendChild(draggable);
            }
			var touch = event.targetTouches[0];
			// Place element where the finger is
			draggable.style.left = touch.pageX-25 + 'px';
			draggable.style.top = touch.pageY-25 + 'px';
			event.preventDefault();
    } 

    const onTouchEndParam = (event, draggable) => {
            // MOJ: This is not needed, because we can just get all elements that are under our finger now.
            //hide the draggable element, or the elementFromPoint won't find what's underneath
			//draggable.style.left = '-1000px';
			//draggable.style.top = '-1000px';
			// find the element on the last draggable position
            //let endPoint= {x: event.changedTouches[0].pageX, y: event.changedTouches[0].pageY}
            let endPointViewPort= {x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY}
            let endPoint= {x: event.changedTouches[0].pageX, y: event.changedTouches[0].pageY}
            console.log("end points are ", endPoint, endPointViewPort)
            let endTargets = document.elementsFromPoint(endPointViewPort.x, endPointViewPort.y);
            console.log("before ", document.getElementById("touchHolder"))
            document.getElementById("touchHolder").style.left=endPoint.x+"px"
            document.getElementById("touchHolder").style.top=endPoint.y+"px"
            console.log("after ", document.getElementById("touchHolder"))
            
            console.log('end targets = ', endTargets)
			// position it relative again and remove the inline styles that aren't needed anymore
	    removeClass(draggable, 'absolute');//Don't put a space before absolute, otherwise it won't work
            //Moj disabled the line below:
            draggable.style.removeProperty("left");
            draggable.style.removeProperty("top");
	    //draggable.removeAttribute('style');
            // put the draggable into it's new home
            let endTarget = validDropTarget(endTargets)
            console.log('and end target = ', endTarget)
			if (endTarget != null) {
                console.log('dropped ', endTarget, ' ', draggable)
                console.log('vs. dropped ', event.target, ' ', draggable)
		callbackOnAction({Action: draggable, Target: endTarget})
                //wrapper.removeChild(draggable);
                //endTarget.appendChild(draggable);
			}
		}

    const getConcatenatedTextNode = elem => { //Returns a concatenation of text nodes of this element
        let nodes = elem.childNodes;
        let result = '';
        for(var i = 0; i < nodes.length; i++) {
            if(nodes[i].nodeType == 3) {       // If it is a text node,
                result += nodes[i].nodeValue;  //    add its text to the result
            }
        }
        console.log(result)
        
        return result.replace(/[\t\n ,.]/g, '')
    }
        
    const validDropTarget = (endTargets) => {
        //returns the first valid drop target from the list of endTargets; else returns none
        
        for(let endTarget of endTargets){
            if(modePreTagAllDroppableElements){
                if(endTarget.className.includes(" validDropTargetMoj "))
                    return endTarget
            }else{
                let textConcEndTarget = getConcatenatedTextNode(endTarget)
                if(textConcEndTarget.length>20){
                    //TODO: THIS DOESN'T WORK
                    console.log('In validDropTarget, concTextNode=', textConcEndTarget, '\nlength=',textConcEndTarget.length)
                    return endTarget
                }
            }
        }
        return null
    }


    const cancelTheTouchDrag = () =>{
        // Here put things that are needed for aborting touch and drop or drag and drop
    }

    /* the drag function */
    for(let comp of [comps.Like,comps.Dislike,comps.Comment,comps.Share]){
        comp.img.addEventListener('touchmove', ev=>onTouchMoveParam(ev, comp.img), false);
        comp.img.addEventListener('touchend', ev=>onTouchEndParam(ev, comp.img));
    }
    /*
    imgLike.addEventListener('touchmove', ev=>onTouchMoveParam(ev, imgLike), false);
    imgDislike.addEventListener('touchmove', ev=>onTouchMoveParam(ev, imgDislike), false);
    imgComment.addEventListener('touchmove', ev=>onTouchMoveParam(ev, imgComment), false);
    imgShare.addEventListener('touchmove', ev=>onTouchMoveParam(ev, imgShare), false);
*/
    /* the drop function */
    /*
    imgLike.addEventListener('touchend', ev=>onTouchEndParam(ev, imgLike));
    imgDislike.addEventListener('touchend', ev=>onTouchEndParam(ev, imgDislike));
    imgComment.addEventListener('touchend', ev=>onTouchEndParam(ev, imgComment));
    imgShare.addEventListener('touchend', ev=>onTouchEndParam(ev, imgShare));
*/
    // just a little helper function
    function removeClass(e,c) {
        e.className = e.className.replace(
            new RegExp('(?:^|\\s)'+c+'(?!\\S)') ,'');
    }
    
//document.addEventListener("message", ev => 
{
//    let msg = JSON.parse(ev.data)
    //let msg = {Action:"UIVisibility", data: true}
    let msg = {Action:"ShowStat", data: {Like: 10, Dislike: 12, Comment: 15}}
    if(msg.Action === "UIVisibility"){
        if(msg.data){
            alert('True')
	    for(elem of [imgHolder, anchor, comps.Like.img, comps.Dislike.img, comps.Comment.img, comps.Share.img, touchHolder]){
	    	elem.style.visibility = "visible"
	    }
            //removeClass(imgHolder, "hiddenElems")
            //removeClass(anchor, "hiddenElems")
            //visible
        } else {
            alert('False')
	    for(elem of [imgHolder, anchor, comps.Like.img, comps.Dislike.img, comps.Comment.img, comps.Share.img, touchHolder]){
	    	elem.style.visibility = "hidden"
	    }
            //imgHolder.className += " hiddenElems "
            //anchor.className += " hiddenElems "
            //hidden
        }
    } else if(msg.Action === "ShowStat"){
        comps.Like.p.innerHTML = msg.data['Like']
        comps.Dislike.p.innerHTML = msg.data['Dislike']
        comps.Comment.p.innerHTML = msg.data['Comment']
    }
}
/*
    msg = {Action:"UIVisibility", data: true}
    if(msg.Action === "UIVisibility"){
        if(msg.data){
            alert('True')

            removeClass(imgHolder, "hiddenElems")
            removeClass(anchor, "hiddenElems")
            //visible
        } else {
            alert('False')
            imgHolder.className += " hiddenElems "
            anchor.className += " hiddenElems "
            //hidden
        }
    }
*/


let callbackOnAction = data => {
// This is the default implementation. 
// In a separate script, we should implement.
// Input: data must be an object that specifies the action and provides any other relevant info.
}
