let Hello = React.createClass({

  getInitialState: function(){
    return { selectedName: this.getNames()[0] };
  },

  getNames: function(){
    return ["Batman", "Robin", "Alfred", "Joker", "Penguin"]; 
  },

  handleNameChange: function(name){
    this.setState({ selectedName: name });
  },

  render: function() {
    return (
      <div>
        <NamePicker 
          names={this.getNames()} 
          onNameChange={this.handleNameChange} />
        
        <br/> <br/>

        Hello, {this.state.selectedName.toUpperCase()}!!
      </div>
    );
  } 
});
 
let NamePicker = React.createClass({
  
  propTypes: {
    names: React.PropTypes.array.isRequired,
    onNameChange: React.PropTypes.func
  },

  onNameChange: function(event){
    if (typeof(this.props.onNameChange) === "function"){
      this.props.onNameChange(event.target.value);
    }
  },

  render: function(){
    return (
      <select onChange={this.onNameChange}>
        {this.props.names.map((name) => {
          return <option value={name}>{name}</option>;
        })}
      </select>
    );
  }
});

React.render(<Hello />, document.querySelector(".js-react-output"));
