let Hello = React.createClass({
    
    getDefaultProps: function(){
        return { name: "World" };
    },

    render: function(){
        return (
            <div className="greeting">
                Hello {this.props.name}!
            </div>
        );
    }
});


let App = React.createClass({
    render: function() {
        return (
            <div> 
                <h3> Default Props in React </h3>
                <Hello name="Mike" />
                <Hello />
            </div>
        );
    }
});

React.render(<App />, document.querySelector(".js-react-output"));
