import className from "classnames";
import SearchFormResultsItem from "src/components/Search/SearchForm/SearchFormResults/SearchFormResultsItem/SearchFormResultsItem";

import styles from "src/components/Search/SearchForm/SearchForm.module.scss";

function SearchFormResults({ count, searchResults }) {
  const resultsClass = className({
    [styles.results]: true,
    [styles.translateX_in__left]: count > 0,
  });

  return (
    <div className={resultsClass}>
      <div className={styles.results__count}>
        <h4>Showing {count} result(s)</h4>
      </div>
      <div className={styles.results__list}>
        {searchResults.map((result, index) => {
          return <SearchFormResultsItem key={index} listing={result} />;
        })}
      </div>
    </div>
  );
}

export default SearchFormResults;
