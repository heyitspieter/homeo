import styles from "styles/modules/Error.module.scss";

function SearchFilterForm({
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
    </div>
  );
}

export default SearchFilterForm;
