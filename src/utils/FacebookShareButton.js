import PropTypes from 'prop-types'

import objectToGetParams from './objectToGetParams'
import createShareButton from './createShareButton'

function facebookLink(url, { quote, hashtag }) {
  if (!url) throw new Error('facebook.url is required')

  return (
    'https://www.facebook.com/sharer/sharer.php' +
    objectToGetParams({
      u: url,
      quote,
      hashtag
    })
  )
}

const FacebookShareButton = createShareButton(
  'facebook',
  facebookLink,
  (props) => {
    if (props.picture) {
      console.warn('FacebookShareButton warning: picture is a deprecated prop.')
    }

    if (props.title) {
      console.warn(
        'FacebookShareButton warning: title is a deprecated prop. Use "quote" instead.'
      )
    }

    if (props.description) {
      console.warn(`FacebookShareButton warning: description is a deprecated prop.
      Use "quote" instead.`)
    }

    return {
      quote: props.quote,
      hashtag: props.hashtag
    }
  },
  {
    quote: PropTypes.string,
    hashtag: PropTypes.string
  },
  {
    windowWidth: 550,
    windowHeight: 400
  }
)

export default FacebookShareButton
