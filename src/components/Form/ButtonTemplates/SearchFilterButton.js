import Svg from "src/components/Svg/Svg";

import styles from "src/components/Search/SearchFilter/SearchFilter.module.scss";

function SearchButton({ btnValue, config, parentClasses }) {
  return (
    <div className={parentClasses.join(" ")}>
      <button {...config}>
        <Svg className={styles.iconSearch} symbol="search" />
        <span> {btnValue}</span>
      </button>
    </div>
  );
}

export default SearchButton;
