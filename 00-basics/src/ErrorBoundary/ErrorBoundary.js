import React, { Component } from 'react'

/**
 * For more information about error boundary, see
 * https://reactjs.org/docs/error-boundaries.html
 */
class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMessage: ''
  }

  // static getDerivedStateFromError(error) {
  //   return {
  //     hasError: true,
  //     errorMessage: error.message
  //   }
  // }

  componentDidCatch = (error, errorInfo) => {
    this.setState({
      hasError: true,
      errorMessage: error.message
    })
  }

  render() {
    if (this.state.hasError) {
      return <h1>{this.state.errorMessage}</h1>
    } else {
      return this.props.children
    }
  }
}

export default ErrorBoundary
