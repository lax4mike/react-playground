let Timer = React.createClass({

  propTypes: {
    startNum: React.PropTypes.number
  },
  
  getDefaultProps: function(){
    return {
      startNum: 0
    };
  },

  getInitialState: function(){
    return { 
      count: this.props.startNum
    };
  },

  componentDidMount: function(){

    setInterval(() => {
      this.setState({ 
        count: this.state.count + 1 
      });
    }, 1000);
  },

  render: function(){

    let text = "";
    let count = this.state.count;

    if (count % 3 === 0){ text += "Fizz "; }
    if (count % 5 === 0){ text += "Buzz "; }

    text = (text === "") ? count : <span>{count} &ndash; {text}</span>;

    return (
      <div>
        <div className="count">{text}</div>
        <p>
          Type something in the input. Notice that it doesn't get cleared 
          even though react is updating the fizz buzz count every second.
        </p>
        <input type="text" />
      </div>
    );
  }

});

React.render(<Timer startNum={42} />, document.querySelector(".js-react-output"));
