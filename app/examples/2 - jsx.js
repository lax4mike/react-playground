/*global React */
let Hello = React.createClass({
    render: function() {
        return (
            <div> Hello, JSX! </div>
        );
    }
});

React.render(<Hello />, document.querySelector(".js-react-output"));
