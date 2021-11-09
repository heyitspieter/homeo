import { SHOW_TAB_BAR, HIDE_TAB_BAR } from "src/store/actions/types";

export const toggleTabBar = (visibility) => {
  if (visibility) {
    return {
      type: SHOW_TAB_BAR,
      visibility,
    };
  }

  return {
    type: HIDE_TAB_BAR,
    visibility,
  };
};
