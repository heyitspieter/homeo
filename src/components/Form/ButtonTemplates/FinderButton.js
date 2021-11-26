function FinderButton({ btnValue, config, parentClasses }) {
  const { setCurrentStep, ...rest } = config;

  return (
    <div className={parentClasses.join(" ")}>
      <button
        onClick={(e) => {
          e.preventDefault();
          setCurrentStep(0);
        }}
      >
        Back
      </button>
      <button {...rest}>{btnValue}</button>
    </div>
  );
}

export default FinderButton;
