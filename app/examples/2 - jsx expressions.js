let Hello = React.createClass({

	getName: function(){
		return "Mike"; 
	},

    render: function() {
        return (
            <div className="greeting"> 
                Hello, {this.getName()}
            </div>
        );
    }
});

React.render(<Hello />, document.querySelector(".js-react-output"));
