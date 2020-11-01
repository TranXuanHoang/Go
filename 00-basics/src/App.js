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

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 30 },
        { name: 'Bob', age: 26 },
        { name: 'Christopher', age: 32 }
      ]
    })
  }

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        { name: 'Hoang', age: 29 },
        { name: event.target.value, age: 26 },
        { name: 'Chris', age: 31 }
      ]
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Hello, World!</h1>
        <button onClick={() => this.switchNameHandler('Hoang!!!')}>Switch Name</button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age} />
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, 'Hoang!')}
          changed={this.nameChangedHandler}>My Hobbies: Racing</Person>
        <Person
          name={this.state.persons[2].name}
          age={this.state.persons[2].age} />
      </div>
    )
  }
}

export default App
