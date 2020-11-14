import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import AuthContext from '../../../context/auth-context'
import withClass from '../../../hoc/withClass'
import classes from './Person.css'

class Person extends Component {
  constructor(props) {
    super(props)
    this.inputElementRef = React.createRef()
  }

  // Define a static contextType with the value of AuthContext
  // to let React automatically conect this Person component to
  // the AuthContext context and creates a context field with a value
  // of as defined in AuthContext
  static contextType = AuthContext

  componentDidMount() {
    // this.inputElement.focus()
    this.inputElementRef.current.focus()
    console.log(this.context)
  }

  render() {
    console.log('[Person.js] rendering')
    return (
      <Fragment>
        {this.context.authenticated ?
          <p>Authenticated!</p> :
          <p>Please login</p>}
        <p onClick={this.props.click}>
          I'm {this.props.name}. I'm {this.props.age} years old.
        </p>
        <p>{this.props.children}</p>
        <input
          // ref={(inputEl) => { this.inputElement = inputEl }}
          ref={this.inputElementRef}
          type="text"
          onChange={this.props.changed}
          value={this.props.name} />
      </Fragment>
    )
  }
}

// object.propTypes is an object that React will watch for in development mode
// and gives warnings if passing incorrect props
Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
}

export default withClass(Person, classes.Person)
