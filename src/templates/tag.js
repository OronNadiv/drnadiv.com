import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import PostCard from '../components/PostCard'
import PostsSidebar from '../components/PostsSidebar'
import _s from 'underscore.string'

const mainImage = '/images/main-1.png'

const CategoryTemplate = ({ location, pageContext, data }) => {
  let { tag } = pageContext
  tag = _s(tag)
    .clean()
    .titleize()
    .value()
    .replace(/_/g, ' ')
  const posts = data.allMarkdownRemark.edges
  const siteUrl = data.site.siteMetadata.siteUrl
  const title = `tag "${tag}"`
  return (
    <Layout location={location} title={title}>
      <SEO title={title} image={`${siteUrl}${mainImage}`} />
      <div className="main">
        <div id="posts-list" className="section-3">
          <div className='mx-5'>
            <div className="rounded bg-white mb-5 py-5 px-5 col d-flex justify-content-between">
              <div className="brand">
                <h5 className="d-inline text-black-50">Tag: </h5>
                <h2 className="d-inline text-capitalize">{tag}</h2>
              </div>
              <Link to={`/`}>Back to Articles</Link>
            </div>
          </div>
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
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    allCategoriesAndTags: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
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
      limit: 1000
      filter: { fields: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            id
            title
            date(formatString: "MMMM DD, YYYY")
            category
            tags
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

export default CategoryTemplate
