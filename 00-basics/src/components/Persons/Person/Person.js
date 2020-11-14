import React, { Component, Fragment } from 'react'
import withClass from '../../../hoc/withClass'
import classes from './Person.css'

class Person extends Component {
  render() {
    console.log('[Person.js] rendering')
    return (
      <Fragment>
        <p onClick={this.props.click}>
          I'm {this.props.name}. I'm {this.props.age} years old.
        </p>
        <p>{this.props.children}</p>
        <input
          type="text"
          onChange={this.props.changed}
          value={this.props.name} />
      </Fragment>
    )
  }
}

export default withClass(Person, classes.Person)
