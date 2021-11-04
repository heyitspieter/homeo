import styles from "styles/modules/Error.module.scss";
import formStyles from "styles/modules/Form.module.scss";

function AuthForm({
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
      <div className={formStyles.form__input_wrapper}>
        {inputElement}
        {label.title.toLowerCase() === "password" && <>{children}</>}
      </div>
      <p className={styles.textError}>{validationMessage}</p>
    </div>
  );
}

export default AuthForm;
