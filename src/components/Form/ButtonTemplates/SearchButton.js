import Svg from "src/components/Svg/Svg";

import styles from "src/components/Search/SearchMobile/SearchForm/SearchForm.module.scss";

function SearchButton({ btnValue, config }) {
  return (
    <button className={styles.form__button} {...config}>
      <Svg className={styles.iconSearch} symbol="search" />
      {btnValue}
    </button>
  );
}

export default SearchButton;
