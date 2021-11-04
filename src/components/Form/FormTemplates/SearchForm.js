import Svg from "src/components/Svg/Svg";

import styles from "src/containers/Hero/Hero.module.scss";

function SearchForm({
  label,
  children,
  labelClasses,
  inputElement,
  parentClasses,
}) {
  return (
    <div className={parentClasses.join(" ")}>
      <button className={styles.btnHome}>
        <Svg className={styles.iconHome} symbol="home" />
      </button>
      {inputElement}
      <label className={labelClasses}>{label.title}</label>
      {children}
    </div>
  );
}

export default SearchForm;
