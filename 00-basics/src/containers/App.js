import React, { Component } from 'react'
import Cockpit from '../components/Cockpit/Cockpit'
import Persons from '../components/Persons/Persons'
import classes from './App.css'

class App extends Component {
  state = {
    persons: [
      { id: 'df2sd', name: 'Hoang', age: 29 },
      { id: '1fw45', name: 'Bob', age: 26 },
      { id: 'jfs90', name: 'Chris', age: 31 }
    ],
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id === id)

    const person = {
      ...this.state.persons[personIndex],
      name: event.target.value
    }

    const persons = [...this.state.persons]
    persons[personIndex] = person

    this.setState({ persons })
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1)
    this.setState({ persons })
  }

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    })
  }

  render() {
    let persons = null

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler} />
    }

    return (
      <div className={classes.App}>
        <Cockpit
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler} />
        {persons}
      </div>
    )
  }
}

export default App
