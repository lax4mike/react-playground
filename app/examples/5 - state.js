let Counter = React.createClass({

    getInitialState: function(){
        return { 
            count: 0 
        };
    },

    incrementCount: function(){
        this.setState({ 
            count: this.state.count + 1 
        });
    },

    render: function(){
        return (
            <div>
                <div className="count">{this.state.count}</div>
                <button onClick={this.incrementCount}>+1</button>
            </div>
        );
    }

});

React.render(<Counter />, document.querySelector(".js-react-output"));
