let Counter = React.createClass({

    getInitialState: function(){
        return { 
            count: 0 
        };
    },

    handleClick: function(){
        this.setState({ 
            count: this.state.count + 1 
        });
    },

    render: function(){
        return (
            <div>
                <div className="count">{this.state.count}</div>
                <button onClick={this.handleClick}>+1</button>
            </div>
        );
    }

});

React.render(<Counter />, document.querySelector(".js-react-output"));
