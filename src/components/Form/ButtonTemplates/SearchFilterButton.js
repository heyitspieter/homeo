import Svg from "src/components/Svg/Svg";

import styles from "src/containers/Search/SearchDesktop/SearchDesktop.module.scss";

function SearchButton({ btnValue, config, children, parentClasses }) {
  return (
    <div className={parentClasses.join(" ")}>
      {children}
      <button {...config}>
        <Svg className={styles.iconSearch} symbol="search" />
        <span> {btnValue}</span>
      </button>
    </div>
  );
}

export default SearchButton;
