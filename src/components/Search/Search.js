import styles from "src/components/Search/Search.module.scss";

function Search({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default Search;
