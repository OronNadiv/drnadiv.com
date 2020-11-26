import React from 'react'
import './section-3.scss'
import PostsSidebar from './posts-sidebar'
import PostCard from './post-card'

const index = ({
  posts,
  allCategoriesAndTags,
  mostResentPosts,
  siteUrl,
  profileImage,
  children
}) => {
  return (
    <div className="section-3">
      {children}
      <div className="post-container">
        <div id="posts-list" className="container-fluid">
          <div className="row">
            <div className="col-12 col-lg-8 text-center order-last order-lg-first">
              {posts.map(({ node }, index) => (
                <PostCard key={index} node={node} siteUrl={siteUrl} />
              ))}
            </div>
            <div className="col-12 col-lg-4 order-first order-lg-last">
              <PostsSidebar
                posts={allCategoriesAndTags.edges}
                recent={mostResentPosts.edges}
                profileImage={profileImage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index
