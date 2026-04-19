/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'

import { useStaticQuery, graphql } from 'gatsby'

function Seo({ description, lang, meta, title, image, children }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `)

  const metaDescription = description || site.siteMetadata.description

  const metaArray = [
    {
      name: 'description',
      content: metaDescription
    },
    {
      property: 'og:title',
      content: title
    },
    {
      property: 'og:description',
      content: metaDescription
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'twitter:card',
      content: 'summary'
    },
    {
      name: 'twitter:creator',
      content: site.siteMetadata.author
    },
    {
      name: 'twitter:title',
      content: title
    },
    {
      name: 'twitter:description',
      content: metaDescription
    },
    {
      name: 'fb:app_id',
      content: 634731470264758
    }
  ].concat(meta)
  image && metaArray.push({ property: 'og:image', content: image })

  return (
    <>
      <html lang={lang} />
      <title>{`${title} | ${site.siteMetadata.title}`}</title>
      {metaArray.map((m, i) => (
        <meta key={i} {...m} />
      ))}
      {children}
    </>
  )
}

Seo.defaultProps = {
  lang: 'en',
  meta: [],
  description: ''
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired
}

export default Seo
