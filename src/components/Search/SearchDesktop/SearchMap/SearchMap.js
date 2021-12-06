import { useContext } from "react";
import Map from "src/components/Map/Map";
import { Marker } from "@react-google-maps/api";
import { MapContext } from "src/context/MapContext";

import styles from "src/components/Search/SearchDesktop/SearchMap/SearchMap.module.scss";

const mapConfig = {
  disableDefaultUI: true,
  zoomControl: false,
};

function SearchMap({ results }) {
  const mapContext = useContext(MapContext);

  let map = <Map zoom={8} location={{ lat: 0, lng: 0 }} />;

  if (results.length > 0) {
    map = (
      <Map
        zoom={8}
        config={mapConfig}
        location={{
          lat: results[0].location.lat,
          lng: results[0].location.lng,
        }}
      >
        {mapContext.isReady &&
          results.slice(1).map((listing, index) => {
            return (
              <Marker
                key={index}
                icon={{
                  url: "/map-icon.svg",
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
                position={{ lat: listing.location.lat, lng: listing.location.lng }}
              />
            );
          })}
      </Map>
    );
  }

  return <div className={styles.container}>{map}</div>;
}

export default SearchMap;
