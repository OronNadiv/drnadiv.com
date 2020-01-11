import React, { useEffect, useState } from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import PostCard from '../components/postCard'
import PostsSidebar from '../components/postsSidebar'
import _s from 'underscore.string'
import { useFirebase } from 'gatsby-plugin-firebase'

const mainImage = '/images/main-1.png'

const CategoryTemplate = ({ location, pageContext, data }) => {
  const [category, setCategory] = useState()

  useEffect(() => {
    const { category } = pageContext
    const categoryPretty = _s(category)
      .clean()
      .titleize()
      .value()
      .replace(/_/g, ' ')
    setCategory(categoryPretty)
  }, [])

  useFirebase(firebase => {
    firebase.analytics().logEvent('category_view', { name: category })
  }, [])

  const posts = data.allMarkdownRemark.edges
  const siteUrl = data.site.siteMetadata.siteUrl
  const title = `category "${category}"`
  return (
    <Layout location={location} title={title}>
      <SEO title={title} image={`${siteUrl}${mainImage}`} />
      <div className="main">
        <div id="posts-list" className="section-3">
          <div className='mx-5'>
            <div className="rounded bg-white mb-5 py-5 px-5 col d-flex justify-content-between">
              <div className="brand">
                <h5 className="d-inline text-black-50">Category: </h5>
                <h2 className="d-inline text-capitalize">{category}</h2>
              </div>
              <Link to={'/'}>Back to Articles</Link>
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
  query CategoryPage($category: String) {
    site {
      siteMetadata {
        title
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
                sizes(maxWidth: 630) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
    allMarkdownRemark: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
      filter: { fields: { category: { eq: $category } }, frontmatter: { isVisible: { ne: "no" } } }
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
