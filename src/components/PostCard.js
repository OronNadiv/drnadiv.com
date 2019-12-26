import { Link } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import _ from 'underscore'
import _s from 'underscore.string'
import TwitterShareButton from '../utils/TwitterShareButton'
import FacebookShareButton from '../utils/FacebookShareButton'
import { CommentsCount, FacebookProvider } from 'react-facebook'

export default ({ node, data }) => {
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

        <div className="tags d-flex flex-row justify-content-start flex-wrap py-5">
          {
            node.frontmatter.tags &&
            _.shuffle(node.frontmatter.tags).map((tag, index) => {
              return (
                <Link className='text-uppercase mb-3 mr-2 py-2 px-3'
                  key={index} to={`/tags/${tag.toLowerCase()}`}>
                  {tag.replace(/_/g, ' ')}
                </Link>
              )
            })
          }
        </div>

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
