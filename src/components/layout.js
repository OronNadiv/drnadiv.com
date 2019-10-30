import React from "react"
import { Link } from "gatsby"
import Loadable from "@loadable/component"

import { rhythm, scale } from "../utils/typography"

const OwlCarousel = Loadable(() => import("react-owl-carousel"))

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <>
          <div className="nav">
            <div className="brand"><a href="index.html">Blog & Baby</a></div>
            <i className="fa fa-bars" />
            <ul className="icons">
              <li><a className="bumps">Bumps & Babys</a></li>
              <li><a className="out">Out & About</a></li>
              <li><a className="day">Days & Nights</a></li>
              <li><a href="index-grid.html">Grids</a></li>
            </ul>
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
            <div className="heading" style={{ backgroundImage: `url("/images/back.png")` }}>
              <div className="content">
                <h2>Welcome to Blog & Baby</h2>
                <p>A blog all about my experiences as a parent living and learning as we went along.</p>
                <a href="#" className="scroll-down">Please scroll down for more</a>
              </div>
            </div>
            <div className="heading" style={{ backgroundImage: `url("/images/baby-5.jpg")` }}>
              <div className="content">
                <h2>Welcome to Blog & Baby</h2>
                <p>A blog all about my experiences as a parent living and learning as we went along.</p>
                <a href="#" className="scroll-down">Please scroll down for more</a>
              </div>
            </div>
            {/*<div className="heading">*/}
            {/*  <div className="content">*/}
            {/*    <h2>Welcome to Blog & Baby</h2>*/}
            {/*    <p>A blog all about my experiences as a parent living and learning as we went along.</p>*/}
            {/*    <a href="#" className="scroll-down">Please scroll down for more</a>*/}
            {/*  </div>*/}
            {/*</div>*/}
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
          This website was built with{' '}
          <i className={`fas fa-heart`} aria-hidden="true" /> by{' '}
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
