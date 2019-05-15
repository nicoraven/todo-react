class List extends React.Component {
    constructor(){
        super()
        this.changeHandler = this.changeHandler.bind( this );
    }

    state = {
        list : [],
        word : ""
    }

    changeHandler = (event) => {
        this.setState({word:event.target.value});
        console.log("change", event.target.value);

    }

    submitHandler = (event) => {
        console.log("word", this.state.word);
        console.log("list", this.state.list);
        let clearWord = "";
        let updatedList = this.state.list;
        updatedList.push(this.state.word);
        this.setState({word: clearWord, list: updatedList});
    }

    render() {
    // render the list with a map() here

        console.log("rendering");
        return (
            <div className="list">
                <input onChange={this.changeHandler} value={this.state.word}/>
                <button onClick={this.submitHandler}>add item</button>
            </div>
        );
    }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);