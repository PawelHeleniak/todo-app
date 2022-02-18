import React, {Component} from 'react';
import './TaskHeader.css'
class TaskHeader extends Component {
  minDate = new Date().toISOString().slice(0, 10)
  state = { 
    text: "",
    date: this.minDate,
    check: true,

    errors:{
      addTask: false,
    }
  }

  handleValue =(value, e)=> {
    if(value === "text" || value === "date"){
      this.setState({
        [value]: e.target.value
      })
    }else if(value === "check"){
      this.setState({
        [value]: e.target.checked
      })
    }
  }

  handleClick =()=> {
    let validation = this.handleValidation()

    if(!validation.text){
      if(!validation.check){
        this.props.add(this.state.text, this.state.date)
      }else{
        this.props.add(this.state.text, null)
      }
      
      this.setState({
        text: ""
      })
      this.setState({
        errors: {
          addTask: false
        }
      })
    }else{
      this.setState({
        errors: {
          addTask: validation
        }
      })
    }
  }

  handleValidation =()=> {
    let text = false
    let check = false

    if(this.state.text.trim() === ""){
      text = true
    }
    if(!this.state.check){
      check = true
    }
    return ({text, check})
  }

  handleSort =(e)=>{
    let sort = e.target.value
    this.props.sort(sort)
  }

  render() {
    const {text,date,check} = this.state;
    const {addTask} = this.state.errors;

    return (
      <div className="taskHeader">
        <h2>Task list</h2>
        <div className="inputWrapper">
          <input type="text" name="addTask" placeholder="Add new task" className={addTask? "validateError":null} id="newTask" value={text} onChange={this.handleValue.bind(this, "text")}/>
        </div>
        <div className="inputWrapper">
          <input type="date" id="finishDate" value={date} disabled={!check? true:false} onChange={this.handleValue.bind(this, "date")} />
          <input type="checkbox" checked={check} onChange={this.handleValue.bind(this, "check")} />
        </div>
        <div className="option">
          <button onClick={this.handleClick}>Add task</button>
          <select onChange={this.handleSort}>
            <option>All</option>
            <option>Done</option>
            <option>Progress</option>
          </select>
        </div>
      </div>
    );
  }
}
 
export default TaskHeader;