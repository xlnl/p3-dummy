import React, { useState, useEffect } from 'react';
import { Button, Input } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import { createPost, updatePost } from '../../actions/posts';

const UploadPost = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ 
      username: '', 
      description: '', 
      image: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((post) => post._id === currentId) : null));
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ username: '', description: '', image: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h2>{currentId ? `Editing Post:"${post._id}"` : 'Make a Post'}</h2>        
            <Input name="username" label="Username" value={postData.username} onChange={(e) => setPostData({ ...postData, username: e.target.value })} />
            <Input name="description" label="Description" value={postData.message} onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
            <div>
                <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, image: base64 })} />
            </div>
            <Button type="submit">Submit</Button>
            <Button onClick={clear}>Clear</Button>
      </form>
    </div>
  );
};

export default UploadPost;