let Hello = React.createClass({

  getNames: function(){
    return ["Batman", "Robin", "Joker"]; 
  },

  render: function() {
    return (
      <div className="greeting"> 
        Hello, 
        <ul>
          {this.getNames().map(function(name){ 
            return <li>{name}</li>;
          })}
        </ul>
      </div>
    );
  } 
});

React.render(<Hello />, document.querySelector(".js-react-output"));