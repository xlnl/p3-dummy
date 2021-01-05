import React, { useEffect, useState } from 'react';
// import { Image } from 'cloudinary-react';

// renders all the posts on a timeline
const Home = () => {
  // const [imageIds, setImageIds] = useState();
  // const loadImages = async () => {
  //     try {
  //         const res = await fetch('/api/images');
  //         const data = await res.json();
  //         setImageIds(data);
  //     } catch (err) {
  //         console.error(err);
  //     }
  // };
  // useEffect(() => {
  //     loadImages();
  // }, []);
  return (
      <div>
          <h1 className="title">Welcome to Petflix</h1>
          <div className="gallery"></div>
      </div>
  );
  
};

export default Home;
