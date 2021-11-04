import PropertyExploreItem from "src/components/PropertyExplore/PropertyExploreItem/PropertyExploreItem";

import styles from "src/components/PropertyExplore/PropertyExplore.module.scss";

function PropertyExplore() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h2>Explore Our Properties</h2>
          <p>Take a look at our properties at home & abroad</p>
        </div>
        <div className={styles.grid}>
          <PropertyExploreItem title="House" imgsrc="house.jpg" icon="home-2" />
          <PropertyExploreItem
            title="Apartment"
            imgsrc="apartment.jpg"
            icon="apartment"
          />
          <PropertyExploreItem
            title="Office"
            imgsrc="office.jpg"
            icon="briefcase"
          />
          <PropertyExploreItem title="Villa" imgsrc="villa.jpg" icon="villa" />
          <PropertyExploreItem title="Room" imgsrc="room.jpg" icon="bed" />
        </div>
      </div>
    </div>
  );
}

export default PropertyExplore;
