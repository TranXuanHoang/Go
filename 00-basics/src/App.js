import React, { Component } from 'react'
import './App.css'
import Person from './Person/Person'

class App extends Component {
  state = {
    persons: [
      { name: 'Hoang', age: 29 },
      { name: 'Bob', age: 26 },
      { name: 'Chris', age: 31 }
    ]
  }

  switchNameHandler = () => {
    this.setState({
      persons: [
        { name: 'Tran Hoang', age: 30 },
        { name: 'Bob', age: 26 },
        { name: 'Christopher', age: 32 }
      ]
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Hello, World!</h1>
        <button onClick={this.switchNameHandler}>Switch Name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>My Hobbies: Racing</Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age} />
      </div>
    )
  }
}

export default App
