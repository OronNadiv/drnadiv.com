import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
    <head>
      <title>Blog & Baby</title>
      <meta charSet="utf-8" />
      <meta name="description" content="Baby Theme" />
      <link rel="icon" href="images/favicon.png" type="image/png" sizes="16x16" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="https://fonts.googleapis.com/css?family=Lato:100,400%7CPlayfair+Display" rel="stylesheet" />
      <link rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <link rel="stylesheet" type="text/css" href="styles/style.css" />
      {/*<link rel="stylesheet" href="styles/owl.css" />*/}
      <link rel="stylesheet" href="styles/owl.carousel.css" />
      {/*<link rel="stylesheet" href="styles/owl-default.css" />*/}
      <link rel="stylesheet" href="styles/owl.theme.default.css" />
      {props.headComponents}

      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      {/*<meta*/}
      {/*  name="viewport"*/}
      {/*  content="width=device-width, initial-scale=1, shrink-to-fit=no"*/}
      {/*/>*/}

    </head>
    <body {...props.bodyAttributes}>
    {props.preBodyComponents}
    <noscript key="noscript" id="gatsby-noscript">
      This app works best with JavaScript enabled.
    </noscript>
    <div
      key={`body`}
      id="___gatsby"
      dangerouslySetInnerHTML={{ __html: props.body }}
    />
    {props.postBodyComponents}
    </body>
    <script
      src="https://code.jquery.com/jquery-3.3.1.min.js"
      integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
      crossOrigin="anonymous"
    />
    <script type="text/javascript" src="js/app.js" />
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
