import { useLoadScript } from "@react-google-maps/api";
import { createContext, useEffect, useState } from "react";

const libraries = ["places"];

export const MapContext = createContext({
  isReady: false,
});

export default ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  const { isLoaded } = useLoadScript({
    libraries,
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });

  useEffect(() => {
    if (isLoaded) setIsReady(true);
  }, [isLoaded]);

  return (
    <MapContext.Provider
      value={{
        isReady,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
