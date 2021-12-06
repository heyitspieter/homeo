import className from "classnames";
import Svg from "src/components/Svg/Svg";
import SearchFormResultsItem from "src/components/Search/SearchMobile/SearchForm/SearchFormResults/SearchFormResultsItem/SearchFormResultsItem";

import styles from "src/components/Search/SearchMobile/SearchForm/SearchForm.module.scss";

function SearchFormResults({ count, toggleSearchFilter, searchResults }) {
  const resultsClass = className({
    [styles.results]: true,
    [styles.translateX_in__left]: count > 0,
  });

  return (
    <div className={resultsClass}>
      <div className={styles.results__header}>
        <h4>Showing {count} result(s)</h4>
        <button onClick={toggleSearchFilter}>
          <Svg symbol="filter" />
          <span>Filter</span>
        </button>
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
