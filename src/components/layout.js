import React from 'react'

class Layout extends React.Component {
  render() {
    const { location, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = <></>
    } else {
      header = <></>
    }
    return (
      <>
        {header}
        {children}
        <footer>
          <p>
            This website was built with <span style={{ color: 'red' }}>♥️</span>{' '}
            by{' '}
            <a
              href="https://www.oronnadiv.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Oron Nadiv
            </a>
          </p>
        </footer>
      </>
    )
  }
}

export default Layout
