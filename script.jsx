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
        console.log("change", event.target.value.length);
    }

    submitHandler = (event) => {
        console.log("word", this.state.word.length);
        console.log("list", this.state.list);

        let clearWord = "";
        let updatedList = this.state.list;

        if (this.state.word.length < 1) {
            alert("Please enter a todo item");
        }
        else if (this.state.word.length > 200){
            alert("Your todo item should be less than 200 characters")
        }
        else {
            updatedList.push(this.state.word);
            this.setState({word: clearWord, list: updatedList});
        }

    }

    render() {
    // render the list with a map() here
        console.log("rendering");
        return (
            <div className="list">
                <input onChange={this.changeHandler} value={this.state.word}/>
                <button onClick={this.submitHandler}>add item</button>
                <br/>
                <ul>
                    {this.state.list.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </div>
        );
    }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);