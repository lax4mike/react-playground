
var resizer = $(".es5-resize-handle");
var body = $("body");

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
        body.toggleClass("is-resizing", v);
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
        $(".editor--es5").css("flexBasis", "50%");
        $(".editor--es6").css("flexBasis", "50%");
    });


var mouseMoveStream = Kefir.fromEvent(window, "mousemove")
    
    // only push to this stream if the mouse is down on the resize handle
    .filterBy(mouseIsDownStream)

    // get x position as a percentage (size of console)
    .map(function(mouseEvent){

        // prevent user selecting while dragging
        mouseEvent.preventDefault();

        var rw = resizer.width();
        var codeWidth  = $(".code").width();
        var codeLeft   = $(".code").offset().left + (($(".code").outerWidth() - $(".code").width())/2);
        var codeMouseX = mouseEvent.pageX - codeLeft - (rw/2); // rw/2 puts us in the middle of the resizer

        // calculate percentage of es5 width.
        return 100 - ((codeMouseX/codeWidth) * 100);

    })

    // don't let it get too small or too big
    .filter(function(percent){
        return percent > 20 && percent < 80;
    })

    .onValue(function(v){
        $(".editor--es5").css("flexBasis", v + "%");
        $(".editor--es6").css("flexBasis", (100 - v) + "%");
    });


