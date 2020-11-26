import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import * as Scroll from 'react-scroll'
import PostsSidebar from '../components/postsSidebar'
import PostCard from '../components/postCard'
import { useFirebase } from 'gatsby-plugin-firebase'

const ScrollLink = Scroll.Link

const mainImage = '/images/main-1.png'

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
      <div className="main">
        <div className="nav">
          <div className="brand">
            <a href="/">Elizabeth Nadiv MD</a>
          </div>
        </div>
        <div
          className="heading"
          style={{ backgroundImage: `url("${mainImage}")` }}
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
        </div>

        <div className="section-3">
          <div className="post-container">
            <div id="posts-list" className="container">
              <div className="row">
                <div className="col-12 col-lg-8 text-center">
                  <div className="container">
                    <div className="row">
                      {posts.map(({ node }, index) => {
                        return (
                          <div
                            key={index}
                            className="col-12 col-md-6"
                            style={{ margin: 0 }}
                          >
                            <PostCard node={node} data={data} />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-4 order-first order-md-last">
                  <PostsSidebar
                    posts={data.allCategoriesAndTags.edges}
                    recent={data.mostResentPosts.edges}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
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
                sizes(maxWidth: 630) {
                  ...GatsbyImageSharpSizes
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
                sizes(maxWidth: 630) {
                  ...GatsbyImageSharpSizes
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
