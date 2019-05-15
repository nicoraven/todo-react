class List extends React.Component {
    constructor(){
        super()
        this.changeHandler = this.changeHandler.bind( this );
    }

    state = {
        list : [],
        word : "",
        className : ""
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
        let classChange = "warning";
        let classReset = "";
        let date = moment().format("D MMMM YYYY");
        let newEntry = [this.state.word, date];

        if (this.state.word.length < 1) {
            this.setState({className: classChange});
            alert("Please enter a todo item");
        }
        else if (this.state.word.length > 200){
            this.setState({className: classChange});
            alert("Your todo item should be less than 200 characters");
        }
        else {
            updatedList.push(newEntry);
            this.setState({word: clearWord, list: updatedList, className: classReset});
        }
    }

    deleteHandler = (index) => {
        let updatedList = this.state.list;
        updatedList.splice(index,1);
        // console.log(updatedList);
        this.setState({list: updatedList});
    }

    render() {
    // render the list with a map() here
    console.log("rendering");

    let listItems = this.state.list.map((item, index) =>{
        return (
            <tr key={index} id={index}>
                <td>{index+1}</td>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
                <td>
                    <button onClick={() => this.deleteHandler(index)}>remove item</button>
                </td>
            </tr>
        )
    })

        return (
            <div className="list">
                <input onChange={this.changeHandler} value={this.state.word} className={this.state.className}/>
                <button onClick={this.submitHandler}>add item</button>
                <table>
                <thead>
                    <tr>
                        <th>SN.</th>
                        <th>Item</th>
                        <th>Date Created</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listItems}
                </tbody>
                </table>
            </div>
        );
    }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);