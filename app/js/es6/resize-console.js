
var resizer = $(".js-console-resize-handle");

// stream of true/false of whether or not the user has their mouse
// down on the resize handle
var mouseIsDownStream = Kefir.merge([
        Kefir.fromEvent(resizer, "mousedown"),
        Kefir.fromEvent(window, "mouseup")
    ])
    .map(function(mouseEvent){
        return mouseEvent.type === "mousedown";
    })
    .onValue(function(v){
        // remove css transitions to prevent conflict
        $("body").toggleClass("is-resizing", v);
    });


// // listen for double click
var doubleClickStream = Kefir.fromEvent(resizer, "click")

    // get the last two clicks
    .slidingWindow(2, 2)

    // convert this click and the last click into a duration
    .map(function(events){
        return events[1].timeStamp - events[0].timeStamp;
    })

    // only keep if the last two clicks were < 250ms
    .filter(function(time){
        return time < 250;
    })

    // on double click, reset code panels to 50% (should match initial css)
    .onValue(function(v){
        $(".output__console").css("maxHeight", "30vh");
        $(".output__console").css("minHeight", "30vh");
    });


var mouseMoveStream = Kefir.fromEvent($(document), "mousemove")
    
    // only push to this stream if the mouse is down on the resize handle
    .filterBy(mouseIsDownStream)

    // get x position as a percentage (size of output)
    .map(function(mouseEvent){

        // prevent user selecting while dragging
        mouseEvent.preventDefault();

        var rh = resizer.height();
        var outputHeight  = $(".output").height();
        var outputTop   = $(".output").offset().top + (($(".output").outerHeight() - $(".output").height())/2);
        var mainMouseY = mouseEvent.pageY - outputTop + (rh/2); // rw/2 puts us in the middle of the resizer

        return outputHeight - mainMouseY;
    })

    // don't let it get too small or too big
    .filter(function(px){
        var outputHeight  = $(".output").height();
        return px > 100 && px < outputHeight*3/4;
    })

    .onValue(function(v){
        $(".output__console").css("maxHeight", v);
        $(".output__console").css("minHeight", v);
    });


