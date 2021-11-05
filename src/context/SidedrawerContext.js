import { createContext, useState } from "react";

export const SidedrawerContext = createContext({
  open: undefined,
  toggle: () => {},
});

export default ({ children }) => {
  const [sideDrawer, setSideDrawer] = useState(false);

  const toggleSideDrawer = () => {
    setSideDrawer(!sideDrawer);
  };

  return (
    <SidedrawerContext.Provider
      value={{
        open: sideDrawer,
        toggle: toggleSideDrawer,
      }}
    >
      {children}
    </SidedrawerContext.Provider>
  );
};
