import './index.scss'
import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'
import * as Scroll from 'react-scroll'
import Section3 from '../components/section-3'
import { getSrc } from 'gatsby-plugin-image'

// Firebase modular SDK imports
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyC7vIjGwuSOdr0yDoMIKrgerPlWaL-yFLI',
  authDomain: 'dr-nadiv.firebaseapp.com',
  databaseURL: 'https://dr-nadiv.firebaseio.com',
  projectId: 'dr-nadiv',
  storageBucket: 'dr-nadiv.appspot.com',
  messagingSenderId: '268607776968',
  appId: '1:268607776968:web:3639471a5a4fd8f22fddfd',
  measurementId: 'G-P1KNZQTJ42'
}

const ScrollLink = Scroll.Link

const mainImage = '/images/main.png'

const Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  const posts = data.allMarkdownRemark.edges

  useEffect(() => {
    try {
      const app = initializeApp(firebaseConfig)
      getAnalytics(app)
    } catch (e) {
      console.error('Firebase initialization error', e)
    }
  }, [])

  const bgImageSrc = getSrc(data.mainImage)

  return (
    <Layout location={location} title={siteTitle}>
      <div className="main main-page">
        <div className="nav">
          <div className="brand">
            <a href="/">Elizabeth Nadiv MD</a>
          </div>
        </div>
        <div
          className="heading"
          style={{
            backgroundImage: `url(${bgImageSrc})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
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
              <i className="fa-solid fa-chevron-down text-black-50" />
            </ScrollLink>
          </div>
        </div>

        <Section3
          posts={posts}
          allCategoriesAndTags={data.allCategoriesAndTags}
          siteUrl={data.site.siteMetadata.siteUrl}
          profileImage={data.profileImage}
        />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    profileImage: file(
      sourceInstanceName: { eq: "images" }
      name: { eq: "profile" }
    ) {
      childImageSharp {
        gatsbyImageData(width: 1400, layout: CONSTRAINED)
      }
    }
    mainImage: file(
      sourceInstanceName: { eq: "images" }
      name: { eq: "main" }
    ) {
      childImageSharp {
        gatsbyImageData(width: 1400, layout: CONSTRAINED)
      }
    }
    site {
      siteMetadata {
        siteUrl
        title
      }
    }
    allCategoriesAndTags: allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
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
      sort: { frontmatter: { date: DESC } }
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
                gatsbyImageData(width: 230, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`

export const Head = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const siteUrl = data.site.siteMetadata.siteUrl
  return <Seo title={siteTitle} image={`${siteUrl}${mainImage}`} />
}

export default Index
