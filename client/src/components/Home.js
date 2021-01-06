import React, { useEffect, useState } from 'react';
// hook from redux to get actions
import { useDispatch } from 'react-redux';

import { findAll } from '../actions/posts'
import Posts from './Posts/Posts'

// renders all the posts on a timeline
const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  // successful dispatch
  useEffect(() => {
    dispatch(findAll());
  }, [currentId, dispatch]);

  return (
      <div>
          <h1 className="title">Welcome to Petflix</h1>
          <div className="gallery">
            <Posts setCurrentId={setCurrentId} />
          </div>
      </div>
  );
};

export default Home;