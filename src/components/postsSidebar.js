import { Link } from 'gatsby'
import React, { useEffect, useState } from 'react'
import _s from 'underscore.string'
import _ from 'underscore'
import useScript from '../hooks/useScript'

const postsSidebar = ({ posts }) => {
  const [categories, setCategories] = useState({})
  const [tags, setTags] = useState({})

  useScript('https://cse.google.com/cse.js?cx=011403241769599577810:cqrlh1yawvj')

  useEffect(() => {
    const categoriesCollection = {}
    const tagsCollection = {}
    posts.forEach(({ node }) => {
      let category = node.frontmatter.category
      if (category) {
        category = category.toLowerCase()
        categoriesCollection[category]
          ? (categoriesCollection[category] += 1)
          : (categoriesCollection[category] = 1)
      }
      setCategories(categoriesCollection)
      const tags = node.frontmatter.tags
      tags &&
      tags.forEach(tag => {
        tag = tag.toLowerCase()
        tagsCollection[tag]
          ? (tagsCollection[tag] += 1)
          : (tagsCollection[tag] = 1)
      })
      setTags(tagsCollection)
    })
  }, [posts])
  return (
    <div className='cell author'>
      <div className='d-flex justify-content-center'>
        <div className="image" />
      </div>
      <h1>About Me</h1>
      <p>
        I am a <a href="https://mydoctor.kaiserpermanente.org/ncal/providers/elizabethnadiv"
          target="_blank"
          rel="noopener noreferrer"
        >pediatrician at Permanente Medicine (aka Kaiser)</a> in
        Daly City. Originally from San Diego, I completed my
        undergraduate at Duke University and medical school at UCSD.
        I moved to the Bay Area in 2005, and joined Kaiser full time
        in 2014. I live in San Carlos with my husband and two
        daughters. In my free time, I enjoy exercise of any kind,
        being with my family, spending time in nature, reading and
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
              .map((category, index) => {
                return (
                  <li key={index}>
                    <Link to={`/categories/${category.toLowerCase()}`} className='text-capitalize'>
                      {_s(category)
                        .clean()
                        .value()
                        .replace(/_/g, ' ')}{' '}
                      ({categories[category]})
                    </Link>
                  </li>
                )
              })}
          </ul>
        </div>

        <div className="widget mt-5 mb-5">
          <div className="sidebar_widget_title font-weight-bold text-uppercase">
            Tags
          </div>
          <div className="blog_tag d-flex flex-row flex-wrap justify-content-center my-3">
            {
              _.shuffle(Object.keys(tags))
                .map((tag, index) => {
                  return (
                    <Link className='p-2 m-1' key={index} to={`/tags/${tag.toLowerCase()}`}>
                      {_s(tag)
                        .clean()
                        .titleize()
                        .value().replace(/_/g, ' ')}{' '}
                      ({tags[tag]})
                    </Link>
                  )
                })
            }
          </div>
        </div>
      </div>
      <div className="gcse-search"/>
    </div>
  )
}

export default postsSidebar
