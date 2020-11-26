import './index.scss'
import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import * as Scroll from 'react-scroll'
import { useFirebase } from 'gatsby-plugin-firebase'
import Section3 from '../components/section-3'
import BackgroundImage from 'gatsby-background-image'

const ScrollLink = Scroll.Link

const mainImage = '/images/main.png'

const index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const siteUrl = data.site.siteMetadata.siteUrl
  const posts = data.allMarkdownRemark.edges

  useFirebase((firebase) => {
    // initialize google analytics
    firebase.analytics()
  }, [])

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={siteTitle} image={`${siteUrl}${mainImage}`} />
      <div className="main main-page">
        <div className="nav">
          <div className="brand">
            <a href="/">Elizabeth Nadiv MD</a>
          </div>
        </div>
        <BackgroundImage
          Tag="div"
          className="heading"
          fluid={data.mainImage.childImageSharp.fluid}
        >
          <div className="content">
            <h2>The Well Child</h2>
            <p>Advice for my patients and their families.</p>
            <ScrollLink
              href="#"
              className="scroll-down"
              to="posts-list"
              smooth
              duration={800}
            >
              Scroll down for more
            </ScrollLink>
          </div>
          <div className="scroll_down">
            <ScrollLink
              href="#"
              className="scroll"
              to="posts-list"
              smooth
              duration={800}
            >
              <i className="fa fa-chevron-down text-black-50" />
            </ScrollLink>
          </div>
        </BackgroundImage>

        <Section3
          posts={posts}
          allCategoriesAndTags={data.allCategoriesAndTags}
          mostResentPosts={data.mostResentPosts}
          siteUrl={data.site.siteMetadata.siteUrl}
          profileImage={data.profileImage.childImageSharp.fluid}
        />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    profileImage: file(
      sourceInstanceName: { eq: "images" }
      name: { eq: "profile" }
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
    mainImage: file(
      sourceInstanceName: { eq: "images" }
      name: { eq: "main" }
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
    site {
      siteMetadata {
        siteUrl
        title
      }
    }
    allCategoriesAndTags: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
      filter: { frontmatter: { isVisible: { ne: "no" } } }
    ) {
      edges {
        node {
          frontmatter {
            category
            tags
          }
        }
      }
    }
    mostResentPosts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
      filter: { frontmatter: { isVisible: { ne: "no" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            featuredImage {
              childImageSharp {
                fluid {
                  aspectRatio
                  base64
                  sizes
                  src
                  srcSet
                }
              }
            }
          }
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { isVisible: { ne: "no" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            id
            date(formatString: "MMMM DD, YYYY")
            title
            category
            tags
            description
            featuredImage {
              childImageSharp {
                fluid {
                  aspectRatio
                  base64
                  sizes
                  src
                  srcSet
                }
              }
            }
          }
        }
      }
    }
  }
`

export default index
