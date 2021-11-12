import { useContext } from "react";
import { MapContext } from "src/context/MapContext";
import mapStyles from "src/components/Map/MapStyles";
import { GoogleMap, Marker } from "@react-google-maps/api";

import styles from "src/components/Map/Map.module.scss";

const mapContainerStyle = {
  height: "100%",
  width: "100%",
};

let options = {
  styles: mapStyles,
};

function Map({ zoom, height, children, config, location }) {
  const mapContext = useContext(MapContext);

  if (!mapContext.isReady)
    return (
      <div className={styles.container}>
        <p>"Loading Map..."</p>
      </div>
    );

  options = { ...options, ...config };

  return (
    <div style={{ height }} className={styles.container}>
      <GoogleMap
        zoom={zoom}
        options={options}
        mapContainerStyle={mapContainerStyle}
        center={{ lat: location.lat, lng: location.lng }}
      >
        <Marker
          icon={{
            url: "/map-icon.svg",
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
            scaledSize: new window.google.maps.Size(30, 30),
          }}
          position={location}
        />
        {children}
      </GoogleMap>
    </div>
  );
}

export default Map;
