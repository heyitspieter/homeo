import ListingFeedItem from "src/components/ListingFeed/ListingFeedItem/ListingFeedItem";

import styles from "src/components/ListingFeed/ListingFeed.module.scss";

function ListingFeed() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h2>Discover Our Featured Listings</h2>
          <p>Top Listings Picked for you</p>
        </div>
        <div className={styles.grid}>
          <ListingFeedItem imgsrc="home-1.jpg" verified />
          <ListingFeedItem imgsrc="home-2.jpg" />
          <ListingFeedItem imgsrc="home-3.jpg" verified />
          <ListingFeedItem imgsrc="home-4.jpg" />
        </div>
      </div>
    </div>
  );
}

export default ListingFeed;
