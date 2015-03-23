
var resizer = document.querySelector(".es5-resize-handle");
var body = $("body");

// Fixing bug where releasing in the iframe doesn't fire window mouseup
var iframe = document.querySelector(".console__iframe").contentDocument;

// stream of true/false of whether or not the user has their mouse
// down on the resize handle
var mouseIsDownStream = Kefir.merge([
        Kefir.fromEvent(resizer, "mousedown"),
        Kefir.fromEvent(window, "mouseup"),
        Kefir.fromEvent(iframe, "mouseup") 
    ])
    .map(function(mouseEvent){
        return mouseEvent.type === "mousedown";
    })
    .onValue(function(v){
        // remove css transitions to prevent conflict
        body.toggleClass("is-resizing", v);
    });


var mouseMoveStream = Kefir.fromEvent(window, "mousemove")
    
    // only push to this stream if the mouse is down on the resize handle
    .filterBy(mouseIsDownStream)

    // get x position as a percentage (size of console)
    .map(function(mouseEvent){

        // prevent user selecting while dragging
        mouseEvent.preventDefault();

        var codeLeft = $(".code").offset().left;
        var codeWidth = $(".code").outerWidth();
        var rw = resizer.offsetWidth;

        // calculate percentage of es5 width.
        return (100 - ((mouseEvent.x - (rw/2) - codeLeft) / codeWidth) * 100);
    })

    // don't let it get too small or too big
    .filter(function(percent){
        return percent > 20 && percent < 80;
    })

    .onValue(function(v){
        $(".code__editor--es5").css("flexBasis", v + "%");
        $(".code__editor--es6").css("flexBasis", (100 - v) + "%");
    });


