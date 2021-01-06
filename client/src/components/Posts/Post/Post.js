import React from 'react';
import { useSelector } from 'react-redux';

const Post = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  console.log(posts)
  return (
      <>
        {posts.map((post) => (
          <div key = {post._id}>
            <Post post={post} setCurrentId={setCurrentId} />
          </div>
        ))}
        <h2>Post</h2>
      </>
    )
};


export default Post; 