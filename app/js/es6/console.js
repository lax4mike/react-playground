// credit goes to https://github.com/jmcriffey/es6-fiddle-web/blob/master/src/es6-fiddle.js

module.exports = {


    updateConsole: function updateConsole(code){

        var iDoc = document.querySelector(".console__iframe").contentDocument;
        var iHead = iDoc.getElementsByTagName("head")[0];

        var userInput = null;
        var bootstrap = null;

        var oldUserInput = iHead.querySelector("#userInput");
        if (oldUserInput) { //clean up the old code
            iHead.removeChild(oldUserInput);
        }
        var oldBootstrap = iHead.querySelector("#bootstrap");
        if (oldBootstrap) { //clean up the old code
            iHead.removeChild(oldBootstrap);
        }

        //create new script elements for the user input
        bootstrap = document.createElement("script");
        bootstrap.setAttribute("id", "bootstrap");

        userInput = document.createElement("script");
        userInput.setAttribute("id", "userInput");
        userInput.setAttribute("type", "module");

        userInput.innerHTML = code;
        bootstrap.innerHTML =
                        'document.body.innerHTML = \'\';\n' +
                        'new traceur.WebPageTranscoder(document.location.href).run();\n';

        iHead.appendChild(userInput);
        iHead.appendChild(bootstrap);

    }
};


