import className from "classnames";
import Svg from "src/components/Svg/Svg";
import Spinner from "src/components/Spinner/Spinner";

import styles from "src/components/Search/SearchMobile/SearchForm/SearchForm.module.scss";

function SearchFormDropdown({ data, searching, count, onSelectPlace }) {
  const dropdownClass = className({
    [styles.dropdown]: true,
    [styles.translateX_out__left]: count > 0,
  });

  return (
    <div className={dropdownClass}>
      <Spinner mini loading={searching} />
      {data.length > 0 && (
        <ul className={styles.dropdown__list}>
          {data.map((address, index) => {
            return (
              <li
                key={index}
                className={styles.dropdown__list_item}
                onClick={() => onSelectPlace(address.description)}
              >
                <Svg className={styles.iconSearch} symbol="map-place" />
                <div className={styles.item__matches}>
                  <span>{address.structured_formatting.main_text}</span>
                  <span>{address.structured_formatting.secondary_text}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default SearchFormDropdown;
