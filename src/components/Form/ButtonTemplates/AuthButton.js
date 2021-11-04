function AuthButton({ btnValue, config, parentClasses }) {
  return (
    <div className={parentClasses.join(" ")}>
      <button {...config}>{btnValue}</button>
    </div>
  );
}

export default AuthButton;
