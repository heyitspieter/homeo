import { formatNumber } from "src/helpers";
import SearchFeedItem from "src/components/Search/SearchDesktop/SearchFeed/SearchFeedItem/SearchFeedItem";

import styles from "src/containers/Search/SearchDesktop/SearchDesktop.module.scss";

function SearchFeed({ results }) {
  return (
    <div className={styles.feed}>
      <div className={styles.feed__header}>
        <p className={styles.feed__header_count}>
          {formatNumber(results.length || 0)} <span>result(s)</span>
        </p>
        <div className={styles.feed__header_sort}>
          
        </div>
      </div>
      <div className={styles.feed__grid}>
        {results.map((result, index) => {
          return <SearchFeedItem key={index} listing={result} />;
        })}
      </div>
      <div className={styles.feed__footer}>
        <button className={styles.btnLoad}>Load More</button>
      </div>
    </div>
  );
}

export default SearchFeed;
