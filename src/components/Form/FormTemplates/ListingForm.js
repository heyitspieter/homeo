import Svg from "src/components/Svg/Svg";

import styles from "styles/modules/Error.module.scss";

function ListingForm({
  label,
  children,
  labelClasses,
  inputElement,
  parentClasses,
  validationMessage,
}) {
  return (
    <div className={parentClasses.join(" ")}>
      <label className={labelClasses}>{label.title}</label>
      {inputElement}
      <p className={styles.textError}>{validationMessage}</p>
      {children}
    </div>
  );
}

export default ListingForm;
