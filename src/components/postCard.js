import { Link } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import _s from 'underscore.string'
import TwitterShareButton from '../utils/TwitterShareButton'
import FacebookShareButton from '../utils/FacebookShareButton'
import { CommentsCount, FacebookProvider } from 'react-facebook'
import PostTags from './postTags'

const postCard = ({ node, data }) => {
  const title = node.frontmatter.title || node.fields.slug
  const category =
    node.frontmatter.category &&
    _s(node.frontmatter.category)
      .clean()
      .titleize()
      .value()
      .replace(/_/g, ' ')
  const siteUrl = data.site.siteMetadata.siteUrl
  const linkUrl = `${siteUrl}${node.fields.slug}`
  return (
    <div className="post" key={node.fields.slug}>
      <Link to={node.fields.slug}>
        <Img
          className="img-fluid rounded mx-auto d-block"
          sizes={
            node.frontmatter.featuredImage.childImageSharp
              .sizes
          }
        />
      </Link>
      <div className="text">
        <span className="date">{node.frontmatter.date}</span>
        <Link to={node.fields.slug}>
          <h1>{title}</h1>
          <h3 className='text-muted text-capitalize'>{category}</h3>
          <p
            style={{ color: 'black' }}
            dangerouslySetInnerHTML={{
              __html:
                node.frontmatter.description || node.excerpt
            }}
          />
          <div className="text-center">Read more</div>
        </Link>

        <PostTags tags={node.frontmatter.tags} />

      </div>
      <div className="social">
        <div className="share">
          <span>share</span>
          <TwitterShareButton
            url={linkUrl}
            className="d-inline"
          >
            <i className="fa fa-twitter" />
          </TwitterShareButton>
          <FacebookShareButton
            url={linkUrl}
            className="d-inline"
          >
            <i className="fa fa-facebook" />
          </FacebookShareButton>
        </div>
        <div className="comments">
          <FacebookProvider appId="634731470264758">
            <span className="d-flex flex-row">
              <CommentsCount
                href={`${siteUrl}/${node.frontmatter.id}`}
              />
              &nbsp;comments
            </span>
          </FacebookProvider>
        </div>
      </div>
    </div>
  )
}

export default postCard
