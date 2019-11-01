module.exports = {
  siteMetadata: {
    title: `The Well Child | Elizabeth Nadiv MD`,
    author: `Oron Nadiv`,
    description: `Elizabeth Nadiv, MD is an experienced pediatrician who works at Kaiser in Daly City. This blog focuses on nutrition, sleep, parenting, and overall wellness.`,
    siteUrl: `https://www.drnadiv.com/`,
    social: {
      twitter: `TODO:`
    }
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-151145434-213959138`
      }
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `The Well Child`,
        short_name: `The Well Child`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#39CDE0`,
        display: `minimal-ui`,
        icon: `content/assets/doctor-2411135_1280.png`
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      }
    }
  ]
}
