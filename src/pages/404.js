import React from 'react'
import { graphql, Link } from 'gatsby'
import SEO from '../components/seo'
import Img from 'gatsby-image'

const color = 'rgba(48, 41, 105)'

const notFound = ({ data }) => {
  return (
    <>
      <SEO title="Not Found" />
      <Img
        fluid={data.sadChildImage.childImageSharp.fluid}
        style={{
          position: 'absolute',
          zIndex: -100,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: '100%',
          width: '100%',
          objectFit: 'cover'
        }}
      />
      <div
        className=""
        style={{
          position: 'absolute',
          zIndex: 100,
          top: '5rem',
          left: '5rem',
          width: '15rem'
        }}
      >
        <div className="container">
          <div className="row">
            <h1 style={{ color }}>Page not found</h1>
          </div>
          <div className="row" style={{ color }}>
            The page you are looking for has been removed or relocated.
          </div>
          <div className="row my-3" style={{ color }}>
            The sadness :-(
          </div>
          <div className="row">
            <Link to={'/'}>Back to Articles</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export const pageQuery = graphql`
  query {
    sadChildImage: file(
      sourceInstanceName: { eq: "images" }
      name: { eq: "sad-child-1380992577sV3" }
    ) {
      childImageSharp {
        fluid {
          base64
          tracedSVG
          srcWebp
          srcSetWebp
          originalImg
          originalName
        }
      }
    }
  }
`

export default notFound
