
var resizer = $(".console__resize-handle");

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


// listen for double click
var clickStream = Kefir.fromEvent(resizer, "mousedown");

var doubleClickStream = clickStream
    
    // collect all clicks for 400 ms
    .bufferBy(clickStream.delay(400))

    // convert that into a number of clicks in that time
    .map(function(events){
        return events.length;
    })

    // filter by double or more clicks
    .filter(function(clicks){
        return clicks >= 2;
    })
    
    // on double click, reset console panel to 25% (should match initial css)
    .onValue(function(v){
        $(".console").css("flexBasis", "25%");
        $(".code").css("flexBasis", "75%");
    });


var mouseMoveStream = Kefir.fromEvent($(document), "mousemove")
    
    // only push to this stream if the mouse is down on the resize handle
    .filterBy(mouseIsDownStream)

    // get x position as a percentage (size of console)
    .map(function(mouseEvent){

        // prevent user selecting while dragging
        mouseEvent.preventDefault();

        var rw = resizer.width();
        var mainWidth  = $("main").width();
        var mainLeft   = $("main").offset().left + (($("main").outerWidth() - $("main").width())/2);
        var mainMouseX = mouseEvent.pageX - mainLeft - (rw/2); // rw/2 puts us in the middle of the resizer

        // calculate percentage of width. 
        return 100 - ((mainMouseX/mainWidth) * 100);
    })

    // don't let it get too small or too big
    .filter(function(percent){
        return percent > 10 && percent < 70;
    })

    .onValue(function(v){
        $(".console").css("flexBasis", v + "%");
        $(".code").css("flexBasis", (100 - v) + "%");
    });


