import { updateObject } from "src/helpers";
import { SHOW_TAB_BAR, HIDE_TAB_BAR } from "src/store/actions/types";

const initialState = {
  visibility: true,
};

const showTabBar = (state, action) => {
  return updateObject(state, {
    visibility: action.visibility,
  });
};

const hideTabBar = (state, action) => {
  return updateObject(state, {
    visibility: action.visibility,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TAB_BAR:
      return showTabBar(state, action);
    case HIDE_TAB_BAR:
      return hideTabBar(state, action);
    default:
      return state;
  }
};

export default reducer;
