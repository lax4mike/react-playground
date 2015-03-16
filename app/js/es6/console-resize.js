
var resizer = document.querySelector(".console__resize-handle");

// stream of true/false of whether or not the user has their mouse
// down on the resize handle
var mouseIsDownStream = Kefir.merge([
        Kefir.fromEvent(resizer, "mousedown"),
        Kefir.fromEvent(window, "mouseup")
    ])
    .map(function(mouseEvent){
        return mouseEvent.type === "mousedown";
    });


var mouseMoveStream = Kefir.fromEvent(window, "mousemove")
    
    // only push to this stream if the mouse is down on the resize handle
    .filterBy(mouseIsDownStream)

    // get y position from bottom (size of console)
    .map(function(mouseEvent){

        // prevent user selecting while dragging
        mouseEvent.preventDefault();

        // document height minus mouse position
        return document.documentElement.clientHeight - mouseEvent.y;
    })

    // don't let it get too small or too big
    .filter(function(v){
        var distanceFromTop = document.documentElement.clientHeight - v;
        return v > 100 && distanceFromTop > 200;
    });


mouseMoveStream.onValue(function(v){
    document.querySelector(".console").style.flexBasis = v + "px";  
});

