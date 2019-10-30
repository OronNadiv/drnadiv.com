import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Img from 'gatsby-image'
import { FacebookProvider, CommentsCount } from 'react-facebook'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <div className="main">
          <a className="scrolltop">
            <i className="fa fa-chevron-up" aria-hidden="true" />
          </a>
          <div className="section-3">
            <div className="post-container">
              <div className="table-row">
                <div className="cell posts">
                  {posts.map(({ node }) => {
                    const title = node.frontmatter.title || node.fields.slug
                    return (
                      <div className="post" key={node.fields.slug}>
                        <Link to={node.fields.slug}>
                          <Img
                            className="img-fluid rounded mx-auto d-block"
                            sizes={
                              node.frontmatter.featuredImage.childImageSharp
                                .sizes
                            }
                          />
                        </Link>
                        {/*<img src="images/placeholder.jpg" alt="Blog Post Image" />*/}
                        <div className="text">
                          <span className="date">{node.frontmatter.date}</span>
                          <Link to={node.fields.slug}>
                            <h1>{title}</h1>
                            {/*<a href="single-post.html"><h1>{title}</h1></a>*/}
                            <p style={{ color: 'black' }}
                               dangerouslySetInnerHTML={{
                                 __html:
                                   node.frontmatter.description || node.excerpt
                               }}
                            />

                            <div className='text-center'>Read more...</div>
                          </Link>
                          {/*<div className="tags">*/}
                          {/*  <span>baby</span>*/}
                          {/*  <span>cute</span>*/}
                          {/*  <span>feeding</span>*/}
                          {/*</div>*/}
                        </div>
                        <div className="social">
                          <div className="share">
                            <span>share</span>
                            <a href="#">
                              <i className="fa fa-twitter" />
                            </a>
                            <a href="#">
                              <i className="fa fa-facebook" />
                            </a>
                            <a href="#">
                              <i className="fa fa-pinterest" />
                            </a>
                            <a href="#">
                              <i className="fa fa-google-plus" />
                            </a>
                          </div>
                          <div className="comments">
                            <FacebookProvider appId="634731470264758">
                              <span className='d-flex flex-row'>
                                <CommentsCount
                                  href={`https://www.drnadiv.com/${node.frontmatter.id}`}
                                >
                                </CommentsCount>
                                &nbsp;comments
                              </span>
                            </FacebookProvider>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="cell author">
                  <div className="image" />
                  <h1>About Me</h1>
                  <p>
                    I am a pediatrician at Permanente Medicine (aka Kaiser) in
                    Daly City. Originally from San Diego, I completed my
                    undergraduate at Duke University and medical school at UCSD.
                    I moved to the Bay Area in 2005, and joined Kaiser full time
                    in 2014. I live in San Carlos with my husband and two
                    daughters. In my free time, I enjoy exercise of any kind,
                    being with my family, spending time in nature, reading and
                    participating in book clubs, photography, and traveling.
                  </p>
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
            id
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
