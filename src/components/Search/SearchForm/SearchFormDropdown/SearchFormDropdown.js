import className from "classnames";
import Svg from "src/components/Svg/Svg";

import styles from "src/components/Search/SearchForm/SearchForm.module.scss";

function SearchFormDropdown({ count }) {
  const dropdownClass = className({
    [styles.dropdown]: true,
    [styles.translateX_out__left]: count > 0,
  });

  return (
    <div className={dropdownClass}>
      <ul className={styles.dropdown__list}>
        <li className={styles.dropdown__list_item}>
          <Svg className={styles.iconSearch} symbol="map-location" />
          <div className={styles.item__matches}>
            <span>Uwaje Ifeanyi street</span>
            <span>Abuja, Nigeria</span>
          </div>
        </li>
        <li className={styles.dropdown__list_item}>
          <Svg className={styles.iconSearch} symbol="map-location" />
          <div className={styles.item__matches}>
            <span>Uwaje Ifeanyi street</span>
            <span>Abuja, Nigeria</span>
          </div>
        </li>
        <li className={styles.dropdown__list_item}>
          <Svg className={styles.iconSearch} symbol="map-location" />
          <div className={styles.item__matches}>
            <span>Uwaje Ifeanyi street</span>
            <span>Abuja, Nigeria</span>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default SearchFormDropdown;
