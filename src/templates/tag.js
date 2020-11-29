import React, { useEffect, useState } from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import _s from 'underscore.string'
import Section3 from '../components/section-3'

const mainImage = '/images/main.png'

const CategoryTemplate = ({ location, pageContext, data }) => {
  const [tag, setTag] = useState()

  useEffect(() => {
    const { tag } = pageContext
    const tagPretty = _s(tag).clean().titleize().value().replace(/_/g, ' ')
    setTag(tagPretty)
  }, [])

  const posts = data.allMarkdownRemark.edges
  const siteUrl = data.site.siteMetadata.siteUrl
  const title = `Tag "${tag}"`
  return (
    <Layout location={location} title={title}>
      <SEO title={title} image={`${siteUrl}${mainImage}`} />
      <div className="main">
        <Section3
          posts={posts}
          allCategoriesAndTags={data.allCategoriesAndTags}
          siteUrl={data.site.siteMetadata.siteUrl}
        >
          <div className="mx-5">
            <div className="rounded bg-white mb-5 py-5 px-5 col d-flex justify-content-between">
              <div className="brand">
                <h5 className="d-inline text-black-50">Tag: </h5>
                <h2 className="d-inline text-capitalize">
                  <Link to={location.pathname}>{tag}</Link>
                </h2>
              </div>
              <Link to={'/'}>Back to Articles</Link>
            </div>
          </div>
        </Section3>
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
      filter: {
        fields: { tags: { in: [$tag] } }
        frontmatter: { isVisible: { ne: "no" } }
      }
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
                fluid(maxWidth: 230) {
                  ...GatsbyImageSharpFluid
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
