let Hello = React.createClass({
    render: function() {
        return (
            <div className="greeting"> 
                Hello, JSX! 
            </div>
        );
    }
});

React.render(<Hello />, document.querySelector(".js-react-output"));
