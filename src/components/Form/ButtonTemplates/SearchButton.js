import Svg from "src/components/Svg/Svg";

import styles from "src/containers/Hero/Hero.module.scss";

function SearchButton({ btnValue, config }) {
  return (
    <button {...config}>
      <Svg className={styles.iconSearch} symbol="search" />
      {btnValue}
    </button>
  );
}

export default SearchButton;
