import React, { Component } from 'react';
import './App.css';
import TaskList from './TaskList';
import TaskHeader from './TaskHeader';

class App extends Component {
  state = {
    tasks:[],
    sort: "all"
  }

  removeTask =(id)=>{
    const tasks = [...this.state.tasks]
    const findTask = tasks.findIndex(task => task.id === id)
    tasks.splice(findTask, 1)

    this.setState({
      tasks
    })
  }

  handleDoneTask =(id)=>{
    const tasks = [...this.state.tasks]
    tasks.map(task=>{
      if(task.id === id){
        task.done = false
      }
    })

    this.setState({
      tasks
    })
  }

  addTask =(text,date)=>{
    let tasks = [...this.state.tasks]
    let findIndex = tasks.map(task=>task.id)
    let maxIndex = Math.max.apply(null,findIndex);
    if(maxIndex >= 0){
      maxIndex = maxIndex+1
    }else{
      maxIndex = 0
    }
    console.log(maxIndex);
    tasks.push({
      id: maxIndex,
      text: text,
      date: date,
      done: true
    })

    this.setState({
      tasks
    })
  }

  handleSortTask =(sort)=>{
    this.setState({
      sort
    })
  }

  TaskList =()=> {
    let tasks = [...this.state.tasks]
    let filtered
    let sort = this.state.sort

    if(!sort){
      sort = "all"
    }

    switch (sort) {
      case "Done":
        filtered = tasks.filter(task=>!task.done)       
        break;
      case "Progress":
        filtered = tasks.filter(task=>task.done)
        break;
      default:
        filtered = tasks
        break;
    }
    return filtered
  }

  render(){
    return (
      <div className="container">
        <div className="wrapperTasklist">
          <TaskHeader add={this.addTask} sort={this.handleSortTask}/>
          <TaskList tasks={this.state.tasks} remove={this.removeTask} done={this.handleDoneTask} sort={this.TaskList()}/>
        </div>
      </div>
    );
  }
}

export default App;