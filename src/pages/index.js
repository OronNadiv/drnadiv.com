import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import ScrollToTop from 'react-scroll-up'
import * as Scroll from 'react-scroll'
import PostsSidebar from '../components/PostsSidebar'
import PostCard from '../components/PostCard'

const ScrollLink = Scroll.Link

const mainImage = '/images/main-1.png'

export default ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const siteUrl = data.site.siteMetadata.siteUrl
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={siteTitle} image={`${siteUrl}${mainImage}`} />
      <div className="main">
        <ScrollToTop showUnder={100} duration={800}>
          <a className="scrolltop">
            <i className="fa fa-chevron-up" aria-hidden="true" />
          </a>
        </ScrollToTop>

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
            <p>
              Advice for my patients and their families.
            </p>
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
        </div>

        <div id="posts-list" className="section-3">
          <div className="post-container">
            <div className="table-row">
              <div className="cell posts">
                {
                  posts.map(({ node }, index) => {
                    return <PostCard key={index} node={node} data={data} />
                  })
                }
              </div>
              <PostsSidebar
                posts={data.allCategoriesAndTags.edges}
                recent={data.mostResentPosts.edges}
              />
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
