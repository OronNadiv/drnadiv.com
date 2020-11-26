import React from 'react'
import Disclaimer from './disclaimer'
import ScrollToTop from 'react-scroll-up'
import '../style.scss'
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
        <div className="position-absolute" style={{ zIndex: 9999 }}>
          <div className="position-relative">
            <ScrollToTop showUnder={100} duration={800}>
              <a className="scrolltop">
                <i className="fa fa-chevron-up" aria-hidden="true" />
              </a>
            </ScrollToTop>
          </div>
        </div>

        <Disclaimer />
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
