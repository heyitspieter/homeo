import { updateObject } from "src/helpers";
import {
  GET_LIKES,
  LIKE_LISTING,
  REMOVE_LISTING,
} from "src/store/actions/types";

const initialState = {
  likes: [],
};

const likeListing = (state, action) => {
  let newLikes = [];
  const likes = state.likes;

  const index = likes.findIndex((like) => like.id === action.id);

  if (index !== -1) {
    newLikes = likes;

    newLikes.splice(index, 1);

    localStorage.setItem("likes", JSON.stringify(newLikes));

    return updateObject(state, {
      likes: newLikes,
    });
  }

  newLikes = [{ id: action.id }, ...likes];

  localStorage.setItem("likes", JSON.stringify(newLikes));

  return updateObject(state, {
    likes: newLikes,
  });
};

const getLikes = (state) => {
  const likes = JSON.parse(localStorage.getItem("likes"));

  if (likes && likes.length > 0) {
    return updateObject(state, {
      likes,
    });
  }

  return state;
};

const removeListing = (state, action) => {
  let newLikes = [];
  const likes = state.likes;

  const index = likes.findIndex((like) => like.id === action.id);

  if (index !== -1) {
    newLikes = likes;

    newLikes.splice(index, 1);

    localStorage.setItem("likes", JSON.stringify(newLikes));

    return updateObject(state, {
      likes: newLikes,
    });
  }

  return state;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LIKE_LISTING:
      return likeListing(state, action);
    case GET_LIKES:
      return getLikes(state);
    case REMOVE_LISTING:
      return removeListing(state, action);
    default:
      return state;
  }
};

export default reducer;
