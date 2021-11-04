import SearchFeedItem from "src/components/Search/SearchFeed/SearchFeedItem/SearchFeedItem";

import styles from "src/components/Search/SearchFeed/SearchFeed.module.scss";

function SearchFeed() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.header__count}>
          13,000 <span>results</span>
        </p>
        <div className={styles.header__sort}>
          <span>Sort by:</span>
          <select>
            <option value="">Newest Listings</option>
            <option value="">Older Listings</option>
          </select>
        </div>
      </div>
      <div className={styles.grid}>
        <SearchFeedItem imgsrc="home-1.jpg" verified />
        <SearchFeedItem imgsrc="home-2.jpg" />
        <SearchFeedItem imgsrc="home-3.jpg" verified />
        <SearchFeedItem imgsrc="home-4.jpg" />
        <SearchFeedItem imgsrc="home-4.jpg" />
        <SearchFeedItem imgsrc="home-4.jpg" />
      </div>
      <div className={styles.footer}>
        <button className={styles.btnLoad}>Load More</button>
      </div>
    </div>
  );
}

export default SearchFeed;
