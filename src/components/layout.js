import React from "react"
import { Link } from "gatsby"
import Loadable from "@loadable/component"

import { rhythm, scale } from "../utils/typography"

const OwlCarousel = Loadable(() => import("react-owl-carousel"))

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    const mainImages = [
      'main-1.png',
      'main-2.jpg',
      'main-3.jpg',
      'main-4.jpg',
      // 'main-5.jpg',
      'main-6.jpg'
    ]
    let header

    if (location.pathname === rootPath) {
      header = (
        <>
          <div className="nav">
            <div className="brand"><a href="/">Elizabeth Nadiv MD</a></div>
            {/*<i className="fa fa-bars" />*/}
            {/*<ul className="icons">*/}
            {/*<li><a className="bumps">Bumps & Babys</a></li>*/}
            {/*<li><a className="out">Out & About</a></li>*/}
            {/*<li><a className="day">Days & Nights</a></li>*/}
            {/*<li><a href="index-grid.html">Grids</a></li>*/}
            {/*</ul>*/}
          </div>
          <OwlCarousel
            className="owl-theme"
            loop
            nav
            navText={["<i class='fa fa-nav fa-chevron-left'></i>", "<i class='fa fa-nav fa-chevron-right'></i>"]}
            autoplay
            dots
            autoPlay={500}
            stopOnHover
            smartSpeed={500}
            responsive={{
              0: {
                items: 1,
              },
            }}
          >
            {
              mainImages.map((mainImage, key) => {
                return (
                <div key={key} className="heading" style={{ backgroundImage: `url("/images/${mainImage}")` }}>
                  <div className="content">
                    <h2>Welcome to Blog & Baby</h2>
                    <p>A blog all about my experiences as a parent living and learning as we went along.</p>
                    <a href="#" className="scroll-down">Please scroll down for more</a>
                  </div>
                </div>
                )
              })
            }
          </OwlCarousel>
        </>
      )
    } else {
      header = (
        <>
        </>

        // <h3
        //   style={{
        //     fontFamily: `Montserrat, sans-serif`,
        //     marginTop: 0,
        //   }}
        // >
        //   <Link
        //     style={{
        //       boxShadow: `none`,
        //       textDecoration: `none`,
        //       color: `inherit`,
        //     }}
        //     to={`/`}
        //   >
        //     {title}
        //   </Link>
        // </h3>
      )
    }
    return (
      <>
        {/*<div*/}
        {/*  style={{*/}
        {/*    marginLeft: `auto`,*/}
        {/*    marginRight: `auto`,*/}
        {/*    maxWidth: rhythm(24),*/}
        {/*    padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,*/}
        {/*  }}*/}
        {/*>*/}
        {/*<header>{header}</header>*/}
        {header}
        {children}
        <footer>
          <p>
            This website was built with{" "}
            <span style={{ color: "red" }}>♥️</span> by{" "}
            <a
              href="https://www.oronnadiv.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Oron Nadiv
            </a>
          </p>
        </footer>

        {/*</div>*/}
      </>
    )
  }
}

export default Layout
