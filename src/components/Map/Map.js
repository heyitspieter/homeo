import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import styles from "src/components/Map/Map.module.scss";

const mapContainerStyle = {
  height: "100%",
  width: "100%",
};

let options = {
  styles,
};

function Map({ zoom, height, config, location }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });

  if (!isLoaded)
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
            url: "/svg/location-black.svg",
            origin: new window.google.maps.Point(0, 0),
            scaledSize: new window.google.maps.Size(30, 30),
          }}
          position={location}
        />
      </GoogleMap>
    </div>
  );
}

export default Map;
