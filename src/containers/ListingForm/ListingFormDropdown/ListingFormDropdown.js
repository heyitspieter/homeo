import Svg from "src/components/Svg/Svg";
import styles from "src/containers/ListingForm/ListingForm.module.scss";

function ListingFormDropdown({ data, onSelectPlace }) {
  return (
    <div className={styles.location__dropdown}>
      {data.length > 0 && (
        <ul className={styles.location__dropdown_list}>
          {data.map((address, i) => {
            return (
              <li onClick={() => onSelectPlace(address.description)} key={i}>
                <div className={styles.iconWrapper}>
                  <Svg className={styles.iconMapPlace} symbol="map-place" />
                </div>
                <div>
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

export default ListingFormDropdown;
