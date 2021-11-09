import { combineReducers } from "redux";
import tabBarReducer from "src/store/reducers/tabBar";

const rootReducer = combineReducers({
  tabBar: tabBarReducer,
});

export default rootReducer;
