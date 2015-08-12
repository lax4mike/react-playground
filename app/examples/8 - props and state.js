let Counter = React.createClass({

  getDefaultProps: function(){
    return {
      startNum: 0
    }
  },

  getInitialState: function(){
    return { 
      count: this.props.startNum
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

React.render(<Counter startNum={42} />, document.querySelector(".js-react-output"));
