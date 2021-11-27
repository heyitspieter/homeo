import { combineReducers } from "redux";
import tabBar from "src/store/reducers/tabBar";
import favorite from "src/store/reducers/favorite";

const rootReducer = combineReducers({
  tabBar,
  favorite,
});

export default rootReducer;
