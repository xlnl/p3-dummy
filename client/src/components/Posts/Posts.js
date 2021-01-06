import React from 'react';
// import { useSelector } from 'react-redux';

import Post from './Post/Post';

// const Posts = ({ setCurrentId }) => {
//   const posts = useSelector((state) => state.posts);
const Posts = () => {
  return (
      <>
        {/* {posts.map((post) => (
          <div key = {post._id}>
            <Post post={post} setCurrentId={setCurrentId} />
          </div>
        ))} */}
        <h1>Posts</h1>
        <Post />
      </>
    )
};


export default Posts;