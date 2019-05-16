class List extends React.Component {
    constructor(){
        super()
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
            console.log(this.state.list);
        }
    }

    enterHandler = (event) => {
        if (event.keyCode === 13) {
            this.submitHandler();
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
                <td><EditableLabel value={item[0]}/></td>
                <td>{item[1]}</td>
                <td>
                    <button className="removeButton" onClick={() => this.deleteHandler(index)}>remove</button>
                </td>
            </tr>
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

class EditableLabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.value,
            editing: false
        };
        this.initEditor();
        this.save = this.save.bind(this);
    }

    initEditor() {
        this.editor = <input type="text" defaultValue={this.state.text} onKeyPress={(event) => {
            // const key = event.which || event.keyCode;
            if (event.which === 13) {
                this.save(event.target.value)
            }
        }} autoFocus={true} className="Input-text"/>;
    }

    edit() {
        this.setState({
            text: this.state.text,
            editing: true
        })
    };

    save(value) {
        this.setState({
            text: value,
            editing: false
        })
    };

    componentDidUpdate() {
        this.initEditor();
    }

    render() {
        if (this.state.editing) {
            return (this.editor);
        } else {
            return (
                <p onClick={() => this.edit()}>{this.state.text}</p>
            );
        }
    }
}

class DragDrop extends React.Component {

    state = {
        tasks: [
          {id: "1", taskName:"Read book",type:"inProgress", backgroundColor: "red"},
          {id: "2", taskName:"Pay bills", type:"inProgress", backgroundColor:"green"},
          {id: "3", taskName:"Go to the gym", type:"Done", backgroundColor:"blue"},
          {id: "4", taskName:"Play baseball", type:"Done", backgroundColor:"green"}
        ]
    }

    onDragStart = (event, taskName) => {
        console.log('dragstart on div: ', taskName);
        event.dataTransfer.setData("taskName", taskName);
    }

    onDragOver = (event) => {
        event.preventDefault();
    }

    onDrop = (event, cat) => {
        let taskName = event.dataTransfer.getData("taskName");

        let tasks = this.state.tasks.filter((task) => {
            if (task.taskName == taskName) {
                task.type = cat;
            }
            return task;
        });

        this.setState({
            ...this.state,
            tasks
        });
    }

    render() {

        var tasks = {
          inProgress: [],
          Done: []
        }

        this.state.tasks.forEach ((task) => {
          tasks[task.type].push(
            <div key={task.id}
              onDragStart = {(event) => this.onDragStart(event, task.taskName)}
              draggable
              className="draggable"
              style = {{backgroundColor: task.bgcolor}}>
              {task.taskName}
            </div>
          );
        });

        return (
          <div className="drag-container">
            <h2 className="head">To Do List Drag & Drop</h2>
            <div className="inProgress"
                onDragOver={(event)=>this.onDragOver(event)}
                onDrop={(event)=>{this.onDrop(event, "inProgress")}}>
              <span className="group-header">In Progress</span>
              {tasks.inProgress}
            </div>
            <div className="droppable"
                onDragOver={(event)=>this.onDragOver(event)}
                onDrop={(event)=>this.onDrop(event, "Done")}>
                <span className="group-header">Done</span>
                {tasks.Done}
            </div>
            <div className="inProgress"
                onDragOver={(event)=>this.onDragOver(event)}
                onDrop={(event)=>{this.onDrop(event, "inProgress")}}>
                <span className="group-header">In Progress</span>
                {tasks.inProgress}
            </div>
          </div>
        );
    }
}

ReactDOM.render(
    <div>
        <Clock/>
        <List/>
    </div>,
    document.getElementById('root')
);