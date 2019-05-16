class ToDoApp extends React.Component {
    constructor(){
        super();
        this.deleteHandler = this.deleteHandler.bind(this);
        this.editText = this.editText.bind(this);
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
            // this.setState({className: classChange});
            alert("Please enter a todo item");
        }
        else if (this.state.word.length > 200){
            // this.setState({className: classChange});
            alert("Your todo item should be less than 200 characters");
        }
        else {
            // updatedList.push(newEntry);
            // this.setState({word: clearWord, list: updatedList});
            this.setState({word: clearWord, list: [...this.state.list, newEntry]});
            console.log(this.state.list);
        }
    }

    enterHandler = (event) => {
        if (event.keyCode === 13) {
            this.submitHandler();
        }
    }

    deleteHandler = (index) => {
        console.log("index", index);
        let updatedList = this.state.list;
        updatedList.splice(index,1);
    //    console.log("new list", updatedList);
        this.setState({list: updatedList});
    }

    editText = (index, text) => {
        let updateList = this.state.list;
        console.log("Editing "+ updateList[index][0]);
        updateList[index][0] = text;
        console.log("updating", text);
        this.setState({list: updateList});
    }

    render() {
    // render the list with a map() here
    console.log("rendering");

    let listItems = this.state.list.map((item, index) =>{
        console.log(index, item);
        return (
            <div className="card" key={index} id={index} draggable="true">
                <EditableLabel
                    index={index}
                    text={item[0]}
                    editText={this.editText}
                />
                <p className="createdDate">date added<br/>{item[1]}</p>
                <button className="removeButton" onClick={() => this.deleteHandler(index)}>remove</button>
            </div>
        )
    })

        return (
            <div className="list">
                <div className="Wrapper">
                <div className="Input">
                    <input type="text" id="input" className="Input-text" placeholder="Enter your todo item here" onChange={() => this.changeHandler(event)} value={this.state.word} onKeyDown={() => this.enterHandler(event)} />
                    <label htmlFor="input" className="Input-label">Hit enter to save</label>
                </div>
                </div>
                <div className="table">
                <div>
                    <div className="header">things to do.</div>
                </div>
                    {listItems}
                </div>

            </div>
        );
    }
}

class EditableLabel extends React.Component {

    constructor(){
        super();
        this.state = {
            editing: false
        };
    }

    editMode = (event) => {
        this.setState({editing: true});
    }

    commitEdit = (event) => {
        this.props.editText(this.props.index, event.target.value);
        this.setState({editing: false});
    }

    render(){

        if (this.state.editing) {
            return (
                <textarea defaultValue={this.props.text}
                autoFocus={true}
                className="Input-edit"
                onKeyDown={(event) => {
                    const key = event.which || event.keyCode;
                    if (key === 13) {
                        this.commitEdit(event)
                    }
                }}
                onBlur={(event) => {this.commitEdit(event)}}
                />

            );
        }
        else {
            return (
                <p className="cardText" onClick={(event) => this.editMode(event)}>{this.props.text}</p>
            );
        }
    }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        date: new Date()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div className="clock">
        <h1>It's time to take charge of your life.</h1>
        <h2>{this.state.date.toLocaleTimeString('en-SG')}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
    <div>
        <Clock/>
        <ToDoApp/>
    </div>,
    document.getElementById('root')
);