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

	#anchor{
	all: initial;	    
        position: absolute;top: 5000px;left: 50px;
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

        `

  document.head.appendChild(style);

    const touchHolder = document.createElement("div");
    touchHolder.id= "touchHolder"
    document.body.appendChild(touchHolder)
	
    const anchor = document.createElement("div");
    anchor.id= "anchor"
    document.body.appendChild(anchor)


    const imgLike = document.createElement("img");
    const imgDislike = document.createElement("img");
    const imgComment = document.createElement("img");
    const imgShare = document.createElement("img");

    imgLike.src = "https://humblebumblebee.github.io/likeIcon.png";
    imgLike['draggable']= "true";
    imgLike.addEventListener('dragstart', dragMoj)
    imgLike.id= "dragLike";
    imgLike.className= "fixedLike";
    imgLike['width']= "64";
    imgLike['height']= "64";

    imgDislike.src = "https://humblebumblebee.github.io/dislikeIcon.png";
    imgDislike['draggable']= "true";
    imgDislike.addEventListener('dragstart', dragMoj)
    imgDislike.id= "dragDislike";
    imgDislike.className= "fixedDislike";
    imgDislike['width']= "64";
    imgDislike['height']= "64";

    imgComment.src = "https://humblebumblebee.github.io/commentIcon.png";
    imgComment['draggable']= "true";
    imgComment.addEventListener('dragstart', dragMoj)
    imgComment.id= "dragComment";
    imgComment.className= "fixedComment";
    imgComment['width']= "64";
    imgComment['height']= "64";

    imgShare.src = "https://humblebumblebee.github.io/shareIcon.png";
    imgShare['draggable']= "true";
    imgShare.addEventListener('dragstart', dragMoj)
    imgShare.id= "dragShare";
    imgShare.className= "fixedShare";
    imgShare['width']= "64";
    imgShare['height']= "64";

    const imgHolder = document.createElement("div");
    imgHolder.className= "imgHolder";

    document.body.appendChild(imgHolder)
    imgHolder.appendChild(imgLike)
    imgHolder.appendChild(imgDislike)
    imgHolder.appendChild(imgComment)
    imgHolder.appendChild(imgShare)
    
    //document.body.appendChild(imgLike)
    //document.body.appendChild(imgComment)
    //document.body.appendChild(imgShare)


    console.log(imgLike)
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



let modePreTagAllDroppableElements = true
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

    const validDropTarget = (endTargets) => {
        //returns the first valid drop target from the list of endTargets; else returns none
        for(let endTarget of endTargets){
            if(modePreTagAllDroppableElements){
                if(endTarget.className.includes(" validDropTargetMoj "))
                    return endTarget
            }else{
                if(endTarget.innerHTML.length>20){
                    //TODO: THIS DOESN'T WORK
                    console.log('In validDropTarget, innerHtml=', endTarget.innerHTML)
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
		imgLike.addEventListener('touchmove', ev=>onTouchMoveParam(ev, imgLike), false);
		imgDislike.addEventListener('touchmove', ev=>onTouchMoveParam(ev, imgDislike), false);
        imgComment.addEventListener('touchmove', ev=>onTouchMoveParam(ev, imgComment), false);
		imgShare.addEventListener('touchmove', ev=>onTouchMoveParam(ev, imgShare), false);

		/* the drop function */
		imgLike.addEventListener('touchend', ev=>onTouchEndParam(ev, imgLike));
		imgDislike.addEventListener('touchend', ev=>onTouchEndParam(ev, imgDislike));
		imgComment.addEventListener('touchend', ev=>onTouchEndParam(ev, imgComment));
		imgShare.addEventListener('touchend', ev=>onTouchEndParam(ev, imgShare));

		// just a little helper function
		function removeClass(e,c) {
			e.className = e.className.replace(
				new RegExp('(?:^|\\s)'+c+'(?!\\S)') ,'');
        }


let callbackOnAction = data => {
// This is the default implementation. 
// In a separate script, we should implement.
// Input: data must be an object that specifies the action and provides any other relevant info.
}
