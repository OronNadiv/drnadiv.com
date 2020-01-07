module.exports = {
  siteMetadata: {
    title: 'The Well Child | Elizabeth Nadiv MD',
    author: 'Oron Nadiv',
    description: 'Elizabeth Nadiv, MD is an experienced pediatrician who works at Kaiser in Daly City. This blog focuses on nutrition, sleep, parenting, and overall wellness.',
    siteUrl: 'https://www.drnadiv.com/',
    social: {
      twitter: 'TODO:'
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590
            }
          },
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              width: 800,
              ratio: 1.77,
              height: 400,
              related: false,
              noIframeBorder: true,
              urlOverrides: [
                {
                  id: 'youtube',
                  embedURL: (videoId) => `https://www.youtube-nocookie.com/embed/${videoId}`
                }
              ]
            }
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants'
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-feed',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'The Well Child',
        short_name: 'The Well Child',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#39CDE0',
        display: 'minimal-ui',
        icon: 'content/assets/doctor-2411135_1280.png'
      }
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn: 'https://e6292b9337954a0e8f07672e0d3accd7@sentry.io/1804852',
        environment: process.env.NODE_ENV,
        enabled: (() =>
          ['production', 'stage'].indexOf(process.env.NODE_ENV) !== -1)()
      }
    },
    {
      resolve: 'gatsby-plugin-categories',
      options: {
        templatePath: `${__dirname}/src/templates/category.js`,
        prefix: '/categories/'
      }
    },
    {
      resolve: 'gatsby-plugin-tags',
      options: {
        templatePath: `${__dirname}/src/templates/tag.js`
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography'
      }
    },
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-firebase',
      options: {
        features: {
          analytics: true
        },
        credentials: {
          apiKey: 'AIzaSyC7vIjGwuSOdr0yDoMIKrgerPlWaL-yFLI',
          authDomain: 'dr-nadiv.firebaseapp.com',
          databaseURL: 'https://dr-nadiv.firebaseio.com',
          projectId: 'dr-nadiv',
          storageBucket: 'dr-nadiv.appspot.com',
          messagingSenderId: '268607776968',
          appId: '1:268607776968:web:3639471a5a4fd8f22fddfd',
          measurementId: 'G-P1KNZQTJ42'
        }
      }
    }
  ]
}
