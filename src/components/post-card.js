import { Link } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import _s from 'underscore.string'
import TwitterShareButton from '../utils/TwitterShareButton'
import FacebookShareButton from '../utils/FacebookShareButton'
import { CommentsCount, FacebookProvider } from 'react-facebook'
import './post-card.scss'
import Truncate from 'react-truncate'

const postCard = ({ node, siteUrl }) => {
  const title = node.frontmatter.title || node.fields.slug
  const category =
    node.frontmatter.category &&
    _s(node.frontmatter.category).clean().titleize().value().replace(/_/g, ' ')
  const linkUrl = `${siteUrl}${node.fields.slug}`
  return (
    <div
      className="post bg-transparent border-0 shadow-none p-3"
      key={node.fields.slug}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-8 text-left">
            <div className="d-flex flex-column justify-content-between h-100">
              <div className="text-muted text-capitalize d-flex align-items-center align-content-center mb-2 mr-2">
                <h3>{category}</h3>
                <h3 className="mx-2">·</h3>
                <h3>{node.frontmatter.date}</h3>
              </div>
              <Link to={node.fields.slug}>
                <h1 className="m-0 font-weight-bold">{title}</h1>
                <p className="text-black-50 mt-2">
                  <Truncate lines={2} ellipsis={<span>...</span>}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.excerpt
                      }}
                    ></div>
                  </Truncate>
                </p>
              </Link>

              <div className="social d-flex justify-content-between p-0 m-0 bg-transparent">
                <div className="share">
                  <span>share</span>
                  <TwitterShareButton url={linkUrl} className="d-inline">
                    <i className="fa fa-twitter" />
                  </TwitterShareButton>
                  <FacebookShareButton url={linkUrl} className="d-inline">
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
          </div>
          <div className="col-4">
            <Link to={node.fields.slug}>
              <Img
                className="img-fluid rounded"
                fluid={node.frontmatter.featuredImage.childImageSharp.fluid}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default postCard
