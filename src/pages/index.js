import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Img from 'gatsby-image'
import { FacebookProvider, CommentsCount } from 'react-facebook'
import FacebookShareButton from '../utils/FacebookShareButton'
import TwitterShareButton from '../utils/TwitterShareButton'
import ScrollToTop from 'react-scroll-up'
import Loadable from '@loadable/component'
import * as Scroll from 'react-scroll'

const ScrollLink = Scroll.Link

const OwlCarousel = Loadable(() => import('react-owl-carousel'))
const mainImages = ['/images/main-1.png']

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const siteUrl = data.site.siteMetadata.siteUrl
    const posts = data.allMarkdownRemark.edges
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={siteTitle} image={`${siteUrl}${mainImages[0]}`} />
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
          <OwlCarousel
            className="owl-theme"
            loop
            nav
            navText={[
              "<i class='fa fa-nav fa-chevron-left text-white'/>",
              "<i class='fa fa-nav fa-chevron-right text-white'/>"
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
                  style={{ backgroundImage: `url("${mainImage}")` }}
                >
                  <div className="content">
                    <h2>The Well Child</h2>
                    <p>
                      A blog about my experience as a mother and pediatrician.
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
              )
            })}
          </OwlCarousel>

          <div id="posts-list" className="section-3">
            <div className="post-container">
              <div className="table-row">
                <div className="cell posts">
                  {posts.map(({ node }) => {
                    const linkUrl = `${siteUrl}${node.fields.slug}`
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
                        <div className="text">
                          <span className="date">{node.frontmatter.date}</span>
                          <Link to={node.fields.slug}>
                            <h1>{title}</h1>
                            <p
                              style={{ color: 'black' }}
                              dangerouslySetInnerHTML={{
                                __html:
                                  node.frontmatter.description || node.excerpt
                              }}
                            />
                            <div className="text-center">Read more</div>
                          </Link>
                        </div>
                        <div className="social">
                          <div className="share">
                            <span>share</span>
                            <TwitterShareButton
                              url={linkUrl}
                              className="d-inline"
                            >
                              <i className="fa fa-twitter" />
                            </TwitterShareButton>
                            <FacebookShareButton
                              url={linkUrl}
                              className="d-inline"
                            >
                              <i className="fa fa-facebook" />
                            </FacebookShareButton>
                          </div>
                          <div className="comments">
                            <FacebookProvider appId="634731470264758">
                              <span className="d-flex flex-row">
                                <CommentsCount
                                  href={`${siteUrl}/${node.frontmatter.id}`}
                                />
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
        siteUrl
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
