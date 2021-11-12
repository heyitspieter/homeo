import { formatNumber } from "src/helpers";
import SearchFeedItem from "src/components/Search/SearchFeed/SearchFeedItem/SearchFeedItem";

import styles from "src/components/Search/SearchFeed/SearchFeed.module.scss";

function SearchFeed({ results }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.header__count}>
          {formatNumber(results.length || 0)} <span>result(s)</span>
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
        {results.map((result, index) => {
          return (
            <SearchFeedItem
              key={index}
              listing={result}
            />
          );
        })}
      </div>
      <div className={styles.footer}>
        <button className={styles.btnLoad}>Load More</button>
      </div>
    </div>
  );
}

export default SearchFeed;
