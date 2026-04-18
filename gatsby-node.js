const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  const config = {
    externals: {
      jquery: 'jQuery' // important: 'Q' capitalized
    }
  }

  if (stage === 'build-html' || stage === 'develop-html') {
    Object.assign(config.externals, {
      crypto: 'commonjs crypto',
      stream: 'commonjs stream',
      util: 'commonjs util',
      http: 'commonjs http',
      https: 'commonjs https',
      zlib: 'commonjs zlib',
      url: 'commonjs url',
      assert: 'commonjs assert',
      fs: 'commonjs fs',
      path: 'commonjs path'
    })
  } else {
    config.resolve = {
      fallback: {
        crypto: false,
        stream: false,
        util: false,
        http: false,
        https: false,
        zlib: false,
        url: false,
        assert: false,
        fs: false,
        path: false
      }
    }
  }

  actions.setWebpackConfig(config)
}

exports.createPages = async({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve('./src/templates/blog-post.js')
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { frontmatter: { date: DESC } }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next
      }
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: 'slug',
      node,
      value
    })
  }
}
