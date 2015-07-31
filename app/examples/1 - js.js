/*global React */
let Hello = React.createClass({

    render: function(){
        return React.createElement(
            "div",
            { "className": "greeting" },
            "Hello, Mike!"
        );
    }

});

React.render(<Hello />, document.querySelector(".js-react-output"));
