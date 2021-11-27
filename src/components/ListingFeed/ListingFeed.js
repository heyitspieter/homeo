import ListingFeedItem from "src/components/ListingFeed/ListingFeedItem/ListingFeedItem";

import styles from "src/components/ListingFeed/ListingFeed.module.scss";

function ListingFeed({ listings }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h2>Discover Our Featured Listings</h2>
          <p>Top Listings Picked for you</p>
        </div>
        <div className={styles.grid}>
          {listings.map((listing, index) => {
            return <ListingFeedItem key={index} listing={listing} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default ListingFeed;
