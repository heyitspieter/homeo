function SearchForm({
  label,
  children,
  labelClasses,
  inputElement,
  parentClasses,
}) {
  return (
    <div className={parentClasses.join(" ")}>
      <label className={labelClasses}>{label.title}</label>
      {inputElement}
      {children}
    </div>
  );
}

export default SearchForm;
