import React from 'react'
import PropTypes from 'prop-types'
import ErrorBoundary from './utils/ErrorBoundary'

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <title>Elizabeth Nadiv MD</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        {props.headComponents}
        <link
          href="https://fonts.googleapis.com/css?family=Lato:100,400%7CPlayfair+Display"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/styles/bootstrap.min.css"
        />
        <link rel="stylesheet" type="text/css" href="/styles/animate.min.css" />
        <link rel="stylesheet" type="text/css" href="/styles/style.css" />
      </head>
      <body {...props.bodyAttributes}>
        <ErrorBoundary>
          {props.preBodyComponents}
          <noscript key="noscript" id="gatsby-noscript">
            This app works best with JavaScript enabled.
          </noscript>
          <div
            key={'body'}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: props.body }}
          />
          {props.postBodyComponents}
        </ErrorBoundary>
        <script
          src="https://code.jquery.com/jquery-3.3.1.min.js"
          integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
          crossOrigin="anonymous"
        />
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array
}
