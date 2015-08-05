let Timer = React.createClass({

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

    componentDidMount: function(){
        
        var timerID = setInterval(() => {
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

        text = (text === "") ? count : `(${count}) ${text}`;

        return (
            <div>
                <div className="count">{text}</div>
            </div>
        );
    }

});

React.render(<Timer startNum={42} />, document.querySelector(".js-react-output"));
