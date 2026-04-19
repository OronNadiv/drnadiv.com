import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import _s from 'underscore.string'
import TwitterShareButton from '../utils/TwitterShareButton'
import FacebookShareButton from '../utils/FacebookShareButton'
import './post-card.scss'
import Truncate from 'react-truncate'

const PostCard = ({ node, siteUrl }) => {
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
          <div className="col-8 text-start">
            <div className="d-flex flex-column justify-content-between h-100">
              <div className="text-muted text-capitalize d-none d-sm-flex align-items-center mb-2 me-2">
                <Link
                  to={`/categories/${node.frontmatter.category}`}
                  className="p-0"
                >
                  <h3 className="text-muted">{category}</h3>
                </Link>
                <h3 className="mx-2">·</h3>
                <h3>{node.frontmatter.date}</h3>
              </div>
              <Link to={node.fields.slug}>
                <h1 className="m-0 fw-bold">{title}</h1>
                <p className="text-black-50 mt-2 d-none d-sm-block">
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
                    <i className="fa-brands fa-x-twitter" />
                  </TwitterShareButton>
                  <FacebookShareButton url={linkUrl} className="d-inline">
                    <i className="fa-brands fa-facebook-f" />
                  </FacebookShareButton>
                </div>
                {/* <div className="comments d-none d-sm-block">
                  <FacebookProvider appId="1496134842183792">
                    <span className="d-flex flex-row">
                      <CommentsCount
                        href={`${siteUrl}/${node.frontmatter.id}`}
                      />
                      &nbsp;comments
                    </span>
                  </FacebookProvider>
                </div> */}
              </div>
            </div>
          </div>
          <div className="col-4 p-0 px-sm-2">
            <Link to={node.fields.slug}>
              <GatsbyImage
                className="img-fluid rounded"
                image={getImage(node.frontmatter.featuredImage)}
                alt={title}
                objectPosition="center center"
                style={{
                  width: '100%'
                }}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
