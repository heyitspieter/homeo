import { textError } from "styles/modules/Error.module.scss";

function FinderForm({
  label,
  children,
  labelClasses,
  inputElement,
  parentClasses,
  validationMessage,
}) {
  return (
    <div className={parentClasses.join(" ")}>
      <label htmlFor={label.htmlFor} className={labelClasses}>
        {label.title}
      </label>
      {inputElement}
      {children}
      <p className={textError}>{validationMessage}</p>
    </div>
  );
}

export default FinderForm;
