import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import Img from "gatsby-image"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <div className="main">
          <a className="scrolltop"><i className="fa fa-chevron-up" aria-hidden="true" /></a>
          <div className="section-3">
            <div className="container">
              <div className="table-row">
                <div className="cell posts">
                  {posts.map(({ node }) => {
                    const title = node.frontmatter.title || node.fields.slug
                    return (
                      <div className="post" key={node.fields.slug}>
                        <Img
                          className="img-fluid rounded mx-auto d-block"
                          sizes={
                            node.frontmatter.featuredImage.childImageSharp
                              .sizes
                          }
                        />

                        {/*<img src="images/placeholder.jpg" alt="Blog Post Image" />*/}
                        <div className="text"><span className="date">{node.frontmatter.date}</span>
                          <a href="single-post.html"><h1>{title}</h1></a>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: node.frontmatter.description || node.excerpt,
                            }}
                          />
                          <div className="tags">
                            <span>baby</span>
                            <span>cute</span>
                            <span>feeding</span>
                          </div>
                        </div>
                        <div className="social">
                          <div className="share">
                            <span>share</span>
                            <a href="#"><i className="fa fa-twitter" /></a>
                            <a href="#"><i className="fa fa-facebook" /></a>
                            <a href="#"><i className="fa fa-pinterest" /></a>
                            <a href="#"><i className="fa fa-google-plus" /></a>
                          </div>
                          <div className="comments">
                            <span>9 comments</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="cell author">
                  <div className="image" />
                  <h1>Hi,I'm Eliza</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia rerum, tempora, eius maiores
                    nobis illo quasi soluta minus dicta sed officiis sapiente adipisci quos rem similique! Mollitia
                    accusantium vero ab.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
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
