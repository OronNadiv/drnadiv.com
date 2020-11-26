import React from 'react'
import PropTypes from 'prop-types'

class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { error: null }
  }

  componentDidCatch (error, errorInfo) {
    this.setState({ error })
    Sentry.configureScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key])
      })
    })
    Sentry.captureException(error)
  }

  render () {
    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired
}

export default ErrorBoundary
