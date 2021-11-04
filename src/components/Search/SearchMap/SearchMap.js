import Map from "src/components/Map/Map";

import styles from "src/components/Search/SearchMap/SearchMap.module.scss";

function SearchMap() {
  return (
    <div className={styles.container}>
      <Map zoom={8} location={{ lat: 0, lng: 0 }} />
    </div>
  );
}

export default SearchMap;
