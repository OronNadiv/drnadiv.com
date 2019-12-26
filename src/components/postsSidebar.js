import { Link } from 'gatsby'
import React, { useEffect, useState } from 'react'
import _s from 'underscore.string'
import _ from 'underscore'

const postsSidebar = ({ posts, recent = [] }) => {
  const [categories, setCategories] = useState({})
  const [tags, setTags] = useState({})

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
      <div className="image" />
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
        {/* <div className="widget side_widget_search"> */}
        {/*  <div className="sidebar_widget_title font-weight-bold text-uppercase">Search</div> */}
        {/*  <img src="images/divider.png" alt="" className="d-block mt-2 mb-4" /> */}
        {/*  <form> */}
        {/*    <input className="form-control" type="search" placeholder="Search..." /> */}
        {/*    <button className="search_icon" type="submit"> */}
        {/*      <span className="mdi mdi-magnify"></span> */}
        {/*    </button> */}
        {/*  </form> */}
        {/* </div> */}

        <div className="widget mt-5">
          <div className="sidebar_widget_title font-weight-bold text-uppercase">
            Categories
          </div>
          <img src="images/divider.png" alt="" className="d-block mt-2 mb-3" />
          <ul className="list-unstyled widget_list ml-0">
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

        {/* <div className="widget mt-5 widget_recent_entries_custom"> */}
        {/*  <div className="sidebar_widget_title font-weight-bold text-uppercase"> */}
        {/*    Recent Post */}
        {/*  </div> */}

        {/*  <img src="images/divider.png" alt="" className="d-block mt-2 mb-4" /> */}
        {/*  <ul className="list-unstyled"> */}
        {/*    {recent.map(({ node }, index) => { */}
        {/*      return ( */}
        {/*        <li key={index} className="clearfix"> */}
        {/*          <div className="re_post_img"> */}
        {/*            <Link to={node.fields.slug}> */}
        {/*              <Img */}
        {/*                className="img-fluid rounded" */}
        {/*                sizes={ */}
        {/*                  node.frontmatter.featuredImage.childImageSharp.sizes */}
        {/*                } */}
        {/*              /> */}
        {/*            </Link> */}
        {/*          </div> */}
        {/*          <div className="re_post_desc"> */}
        {/*            <Link to={node.fields.slug} className="font-weight-bold"> */}
        {/*              {node.frontmatter.title} */}
        {/*            </Link> */}
        {/*            <span className="post-date fonts-italic"> */}
        {/*              {node.frontmatter.date} */}
        {/*            </span> */}
        {/*          </div> */}
        {/*        </li> */}
        {/*      ) */}
        {/*    })} */}
        {/*  </ul> */}
        {/* </div> */}

        {/* <div className="widget mt-5"> */}
        {/*  <div className="sidebar_widget_title font-weight-bold text-uppercase">Archives</div> */}
        {/*  <img src="images/divider.png" alt="" className="d-block mt-2 mb-3" /> */}
        {/*  <ul className="list-unstyled widget_list"> */}
        {/*    <li><a href="#"><i className="mdi mdi-chevron-double-right"></i> January 2018</a></li> */}
        {/*    <li><a href="#"><i className="mdi mdi-chevron-double-right"></i> February 2018</a></li> */}
        {/*    <li><a href="#"><i className="mdi mdi-chevron-double-right"></i> March 2018</a></li> */}
        {/*    <li><a href="#"><i className="mdi mdi-chevron-double-right"></i> April 2018</a></li> */}
        {/*  </ul> */}
        {/* </div> */}

        <div className="widget mt-5">
          <div className="sidebar_widget_title font-weight-bold text-uppercase">
            Tags
          </div>
          <img src="images/divider.png" alt="" className="d-block mt-2 mb-4" />
          <div className="blog_tag d-flex flex-row flex-wrap justify-content-center my-3">
            {_.shuffle(Object.keys(tags))
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
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default postsSidebar
