import React, { useEffect, useState } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'
import { FacebookProvider, Comments } from 'react-facebook'
import FacebookShareButton from '../utils/FacebookShareButton'
import TwitterShareButton from '../utils/TwitterShareButton'
import PostTags from '../components/post-tags'
import './blog-post.scss'
import _ from 'underscore'
import BackgroundImage from 'gatsby-background-image'

const BlogPostTemplate = ({ data, location, pageContext }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const siteUrl = data.site.siteMetadata.siteUrl
  const { previous, next } = pageContext
  const linkUrl = `${siteUrl}${post.fields.slug}`

  const [tags, setTags] = useState([])

  useEffect(() => {
    setTags(_.shuffle(post.frontmatter.tags))
  }, [])

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={
          post.frontmatter.featuredImage.publicURL &&
          `${siteUrl}${post.frontmatter.featuredImage.publicURL}`
        }
      />
      <div className="blog-post">
        <BackgroundImage
          Tag="div"
          className="heading"
          fluid={post.frontmatter.featuredImage.childImageSharp.fluid}
        >
          <div className="nav white sticky">
            <div className="brand">
              <Link to={'/'}>Elizabeth Nadiv MD</Link>
            </div>
            <ul className="icons">
              <li>
                <Link to={'/'}>Back to Articles</Link>
              </li>
            </ul>
          </div>
          <div className="top-post">
            <span className="date">{post.frontmatter.date}</span>
            <a href="#">
              <h1>{post.frontmatter.title}</h1>
            </a>
          </div>
        </BackgroundImage>

        <div className="main">
          <div className="section-3 single-post">
            <div className="table-row">
              <div className="post-container">
                <div className="cell posts">
                  <div className="post">
                    <div className="text pb-0 text-left">
                      <section
                        dangerouslySetInnerHTML={{ __html: post.html }}
                      />
                      <PostTags tags={tags} />
                    </div>
                    <div className="d-flex justify-content-end social bg-white py-2 pr-3 mr-3">
                      <div className="share">
                        <span>share</span>
                        <TwitterShareButton url={linkUrl} className="d-inline">
                          <i className="fa fa-twitter" />
                        </TwitterShareButton>
                        <FacebookShareButton url={linkUrl} className="d-inline">
                          <i className="fa fa-facebook" />
                        </FacebookShareButton>
                      </div>
                    </div>

                    <div className="social">
                      <div className="comments-single-post">
                        <FacebookProvider appId="634731470264758">
                          <Comments
                            href={`${siteUrl}/${post.frontmatter.id}`}
                            width="100%"
                          />
                        </FacebookProvider>
                      </div>
                    </div>
                  </div>
                  <nav>
                    <div className="row mx-2">
                      <div className="col-lg-6 col-md-6 col-12">
                        {previous && (
                          <Link
                            to={previous.fields.slug}
                            rel="prev"
                            className="flex-row d-flex justify-content-start align-items-center"
                          >
                            <i className="fa fa-chevron-left text-muted mr-3 mt-2" />
                            <div className="text-left">
                              <span className="text-muted">Prev Post</span>
                              <h4>{previous.frontmatter.title}</h4>
                            </div>
                          </Link>
                        )}
                      </div>
                      <div className="col-lg-6 col-md-6 col-12">
                        {next && (
                          <Link
                            to={next.fields.slug}
                            rel="next"
                            className="flex-row d-flex justify-content-end align-items-center"
                          >
                            <div className="text-right">
                              <div className="text-muted">Next Post</div>
                              <h4>{next.frontmatter.title}</h4>
                            </div>
                            <i className="fa fa-chevron-right text-muted ml-3 mt-2" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr
          style={{
            marginBottom: rhythm(1)
          }}
        />
      </div>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        id
        title
        date(formatString: "MMMM DD, YYYY")
        description
        category
        tags
        featuredImage {
          publicURL
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
`
