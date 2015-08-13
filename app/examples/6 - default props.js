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
        <h3> Props in React </h3>
        <Hello name="Lonestar" />
        <Hello />
      </div>
    );
  }
});

React.render(<App />, document.querySelector(".js-react-output"));
