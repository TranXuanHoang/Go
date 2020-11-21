import React, { Component, Fragment } from 'react'
import Modal from '../../components/UI/Modal/Modal'

/**
 * A function that wraps a component and handles any errors occur
 * when making HTTP requests in that component.
 * @param {Component} WrappedComponent the component to be error-handled
 * @param {Axios} axios the axios that is used to send HTTP requests and is error-handled
 */
const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    componentDidMount() {
      // Clear error state before sending any request
      axios.interceptors.request.use(req => {
        this.setState({ error: null })
        return req
      })

      // Checking error with the response
      // Setup a global interceptor allowing us to handle errors
      // The interceptors.response.use() should receive two functions
      // one for successful response case, one for error case like bellow
      // axios.interceptors.response.use(response => {}, error => {})
      // Here we only consider the error, so we simply pass to the first argument
      // a function that forwards the response to the HTTP request caller
      axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error })
      })
    }

    errorConfirmedHandler = () => {
      this.setState(
        { error: null }
      )
    }

    render() {
      return (
        <Fragment>
          <Modal show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error && this.state.error.message}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      )
    }
  }
}

export default withErrorHandler
