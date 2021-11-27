import {
  GET_LIKES,
  LIKE_LISTING,
  REMOVE_LISTING,
} from "src/store/actions/types";

export const likeListing = (id) => {
  return {
    type: LIKE_LISTING,
    id,
  };
};

export const getLikes = () => {
  return {
    type: GET_LIKES,
  };
};

export const removeListing = (id) => {
  return {
    type: REMOVE_LISTING,
    id,
  };
};
