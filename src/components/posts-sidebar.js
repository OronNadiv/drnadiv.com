import Img from 'gatsby-image'
import { Link } from 'gatsby'
import React, { useEffect, useState } from 'react'
import _s from 'underscore.string'
import _ from 'underscore'
import './posts-sidebar.scss'

const postsSidebar = ({ posts, profileImage }) => {
  const [categories, setCategories] = useState({})
  const [tags, setTags] = useState({})

  useEffect(() => {
    const categoriesCollection = {}
    const tagsCollection = {}
    posts.forEach(({ node }) => {
      const category = node.frontmatter.category
      if (category) {
        const categoryLink = category.toLowerCase()
        const categoryText = _s(category)
          .clean()
          .titleize()
          .value()
          .replace(/_/g, ' ')
        if (!categoriesCollection[categoryLink]) {
          categoriesCollection[categoryLink] = {
            count: 0,
            link: categoryLink,
            text: categoryText
          }
        }
        categoriesCollection[categoryLink].count += 1
      }
      setCategories(categoriesCollection)

      const tags = node.frontmatter.tags
      tags &&
      tags.forEach((tag) => {
        const tagLink = tag.toLowerCase()
        const tagText = _s(tag).clean().titleize().value().replace(/_/g, ' ')
        if (!tagsCollection[tagLink]) {
          tagsCollection[tagLink] = {
            count: 0,
            link: tagLink,
            text: tagText,
            order: _.random(Number.MAX_SAFE_INTEGER)
          }
        }
        tagsCollection[tagLink].count += 1
      })
      setTags(tagsCollection)
    })
  }, [posts])

  return (
    <div className="cell author px-auto pt-3 pb-5">
      <div className="d-flex justify-content-center">
        <Img className="image" fluid={profileImage} />
      </div>
      <h1 className="pt-3">About Me</h1>
      <p>
        I am a{' '}
        <a
          href="https://mydoctor.kaiserpermanente.org/ncal/providers/elizabethnadiv"
          target="_blank"
          rel="noopener noreferrer"
        >
          pediatrician at Permanente Medicine (aka Kaiser)
        </a>{' '}
        in Daly City. Originally from San Diego, I completed my undergraduate at
        Duke University and medical school at UCSD. I moved to the Bay Area in
        2005, and joined Kaiser full time in 2014. I live in San Carlos with my
        husband and two daughters. In my free time, I enjoy exercise of any
        kind, being with my family, spending time in nature, reading and
        participating in book clubs, photography, and traveling.
      </p>

      <div className="mt-3 blog_sidebar rounded text-center">
        <div className="widget mt-5">
          <div className="sidebar_widget_title font-weight-bold text-uppercase">
            Categories
          </div>
          <ul className="list-unstyled widget_list my-3 ml-0">
            {Object.keys(categories)
              .sort(_s.naturalCmp)
              .map((key, index) => {
                const { link, text, count } = categories[key]
                return (
                  <li key={index}>
                    <Link
                      to={`/categories/${link}`}
                      className="text-capitalize"
                    >
                      {text} ({count})
                    </Link>
                  </li>
                )
              })}
          </ul>
        </div>

        <div className='d-none'>
          <div className="widget mt-5">
            <div className="sidebar_widget_title font-weight-bold text-uppercase">
              Tags
            </div>
            <div className="blog_tag d-flex flex-row flex-wrap justify-content-center my-3 ">
              {_.sortBy(Object.keys(tags), (key) => tags[key].order).map(
                (key, index) => {
                  const { link, text, count } = tags[key]
                  return (
                    <Link className="p-2 m-1" key={index} to={`/tags/${link}`}>
                      {text} ({count})
                    </Link>
                  )
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default postsSidebar
