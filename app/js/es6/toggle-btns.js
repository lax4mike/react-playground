/*global $ */

$(".toggle--es6").change(function(event){
    var checked = event.target.checked;
    if (!checked && !$(".toggle--es5").checked){
        updateToggle($(".toggle--es5"), true);
    }

    updateToggle($(".toggle--es6"), checked);
});

$(".toggle--es5").change(function(event){
    var checked = event.target.checked;
    if (!checked && !$(".toggle--es6").checked){
        updateToggle($(".toggle--es6"), true);
    }
    updateToggle($(".toggle--es5"), checked);
});


$(".toggle--console").change(function(event){
    var checked = event.target.checked;
    updateToggle($(".toggle--console"), checked);
});


function updateToggle(toggle, checked){

    // force the checkbox to be the value
    toggle.prop("checked", checked);

    // hide left padding on es5 if it's on the left now
    $(".editor--es5").toggleClass("no-padding", !$(".toggle--es6").prop("checked"));


    // update the toggle pane
    var hideSelector = toggle.attr("data-hide");
    $("body").toggleClass("hide-" + hideSelector, !checked);
}


