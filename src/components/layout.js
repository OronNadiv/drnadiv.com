import React from 'react'
import Loadable from '@loadable/component'

const OwlCarousel = Loadable(() => import('react-owl-carousel'))

class Layout extends React.Component {
  render() {
    const { location, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    const mainImages = [
      'main-1.png',
      'main-2.jpg',
      // 'main-3.jpg',
      'main-4.jpg'
      // 'main-5.jpg',
      // 'main-6.jpg'
    ]
    let header

    if (location.pathname === rootPath) {
      header = (
        <>
          <div className="nav">
            <div className="brand">
              <a href="/">Elizabeth Nadiv MD</a>
            </div>
          </div>
          <OwlCarousel
            className="owl-theme"
            loop
            nav
            navText={[
              '<i class=\'fa fa-nav fa-chevron-left text-white\'/>',
              '<i class=\'fa fa-nav fa-chevron-right text-white\'/>'
            ]}
            autoplay
            dots
            autoPlay={500}
            smartSpeed={500}
            responsive={{
              0: {
                items: 1
              }
            }}
          >
            {mainImages.map((mainImage, key) => {
              return (
                <div
                  key={key}
                  className="heading"
                  style={{ backgroundImage: `url("/images/${mainImage}")` }}
                >
                  <div className="content">
                    <h2>The Well Child</h2>
                    <p>
                      A blog about my experience as a mother and pediatrician.
                    </p>
                    <a href="#" className="scroll-down">
                      Scroll down for more
                    </a>
                  </div>
                </div>
              )
            })}
          </OwlCarousel>
        </>
      )
    } else {
      header = (
        <></>
      )
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
