import axios from 'axios';

const url = 'http://localhost:8080/home';
const urlUser = 'http://localhost:8080/profile';

export const findAll = () => axios.get(url);
export const findOne = (postId) => axios.get(`${url}/${postId}`);
export const createPost = (newPost) => axios.post([`${urlUser}/upload`], newPost);
export const likePost = (postId) => axios.put([
    `${url}/${postId}/likePost`, 
    `${urlUser}/${postId}/likePost`
]);
export const updatePost = (postId, updatedPost) => axios.put(`${urlUser}/${postId}`, updatedPost);
export const deletePost = (postId) => axios.delete(`${urlUser}/${postId}`);