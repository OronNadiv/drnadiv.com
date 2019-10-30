import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { rhythm, scale } from '../utils/typography'
import { FacebookProvider, Comments } from 'react-facebook'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article>
          <div
            className="heading"
            style={{
              backgroundImage: `url("${post.frontmatter.featuredImage.publicURL}")`
            }}
          >
            {/*{post.frontmatter.featuredImage && (*/}
            {/*  <Img*/}
            {/*    className="img-fluid rounded mx-auto d-block"*/}
            {/*    sizes={*/}
            {/*      post.frontmatter.featuredImage.childImageSharp.sizes*/}
            {/*    }*/}
            {/*  />*/}
            {/*)}*/}
            <div className="nav white sticky">
              <div className="brand">
                <Link to={`/`}>Elizabeth Nadiv MD</Link>
              </div>
              <i className="fa fa-bars"></i>
              <ul className="icons">
                <li>
                  {/*<a href="index-left.html">Back to Articles</a>*/}
                  <Link to={`/`}>Back to Articles</Link>
                </li>
              </ul>
            </div>
            <div className="top-post">
              <span className="date">{post.frontmatter.date}</span>
              <a href="#">
                <h1>{post.frontmatter.title}</h1>
              </a>
            </div>
          </div>

          {/*<header>*/}
          {/*  <h1*/}
          {/*    style={{*/}
          {/*      marginTop: rhythm(1),*/}
          {/*      marginBottom: 0,*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    {post.frontmatter.title}*/}
          {/*  </h1>*/}
          {/*  <p*/}
          {/*    style={{*/}
          {/*      ...scale(-1 / 5),*/}
          {/*      display: `block`,*/}
          {/*      marginBottom: rhythm(1),*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    {post.frontmatter.date}*/}
          {/*  </p>*/}
          {/*</header>*/}

          <div className="main">
            <a className="scrolltop">
              <i className="fa fa-chevron-up" aria-hidden="true" />
            </a>
            <div className="section-3 single-post">
              <div className="table-row">
                <div className="container">
                  <div className="cell posts">
                    <div className="post">
                      <div className="text">
                        <section
                          dangerouslySetInnerHTML={{ __html: post.html }}
                        />
                      </div>
                      <div className="social">
                        <div className="comments-single-post">
                          <FacebookProvider appId="634731470264758">
                            <Comments
                              href={`https://www.drnadiv.com/${post.frontmatter.id}`}
                              width="100%"
                            />
                          </FacebookProvider>
                        </div>
                      </div>
                    </div>
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
          <footer></footer>
        </article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        id
        title
        date(formatString: "MMMM DD, YYYY")
        description
        featuredImage {
          publicURL
        }
      }
    }
  }
`
