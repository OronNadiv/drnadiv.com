import React from 'react'
import { Link } from 'gatsby'
import _ from 'underscore'

const postTags = ({ tags }) => {
  console.log('tags:', tags)
  return tags && tags.length &&
    <div className="tags d-flex flex-row justify-content-start flex-wrap py-5">
      {
        _.shuffle(tags).map((tag, index) => {
          return (
            <Link className='text-uppercase mb-3 mr-2 py-2 px-3' key={index} to={`/tags/${tag.toLowerCase()}`}>
              {tag.replace(/_/g, ' ')}
            </Link>
          )
        })
      }
    </div>
}

export default postTags
