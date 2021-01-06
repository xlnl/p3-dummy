import { CREATE, UPDATE, DELETE, FETCH_ALL, FETCH_ONE, LIKE } from "../components/common/ActionTypes";

// reducer = function that accepts the state and function (action)
// use switch statement to make it more DRY + streamlined
// returns logic based on action

const reducers = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload
    case FETCH_ONE:
        return posts.filter((post) => post._id === action.payload)
    case CREATE:
      return [...posts, action.payload]
    case DELETE:
      return posts.filter((post) => post._id !== action.payload)
    case UPDATE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post))
    case LIKE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
      default:
      return posts
  }
};

export default reducers;