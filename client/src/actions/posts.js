import { FETCH_ALL, FETCH_ONE, CREATE, UPDATE, DELETE, LIKE } from '../components/common/ActionTypes';

import * as api from '../api/index.js';

// using dispatch/redux-thunk to have async-await properties for the actions 
// get the response from the API and destructure the data (post)
export const findAll = () => async (dispatch) => {
  try {
    const { data } = await api.findAll();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const findOne = () => async (dispatch) => {
    try {
      const { data } = await api.findOne();

      dispatch({ type: FETCH_ONE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
}; 