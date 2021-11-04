import className from "classnames";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { checkFormValidity, updateObject } from "src/helpers";
import FormInput from "src/components/Form/FormInput/FormInput";
import FormButton from "src/components/Form/FormButton/FormButton";

import styles from "src/containers/Hero/Hero.module.scss";

function Hero() {
  const [formControls, setFormControls] = useState({
    search: {
      label: {
        title: "",
        htmlFor: "search",
        classes: [styles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "text",
        id: "search",
        required: true,
        placeholder: "Enter an address, neighborhood, city or ZIP code",
      },
      elementClasses: [styles.form__input],
      parentClasses: [styles.form__group],
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      error: {
        message: "",
      },
    },
  });

  const [formValidity, setFormValidity] = useState(false);

  let formElementsArray = [];

  const router = useRouter();

  for (let key in formControls) {
    formElementsArray.push({
      id: key,
      config: formControls[key],
    });
  }

  const inputChangeHandler = (event, formControlKey) => {
    const updatededFormControls = updateObject(formControls, {
      [formControlKey]: updateObject(formControls[formControlKey], {
        value: event.target.value,
        valid: checkFormValidity(
          event.target.value,
          formControls[formControlKey].validation
        ),
        touched: true,
      }),
    });

    let formIsValid = true;

    for (let key in updatededFormControls) {
      formIsValid = updatededFormControls[key].valid && formIsValid;
    }

    setFormValidity(formIsValid);
    setFormControls(updatededFormControls);
  };

  /** Iterate over all the form elements and return it to the view */
  let formInputs = formElementsArray.map(({ id, config }) => (
    <FormInput
      key={id}
      type="search"
      value={config.value}
      label={config.label}
      error={config.error.message}
      elementType={config.elementType}
      shouldValidate={config.validation}
      labelClasses={config.label.classes}
      elementConfig={config.elementConfig}
      inputClasses={config.elementClasses}
      parentClasses={config.parentClasses}
      invalid={config.touched && !config.valid}
      write={(event) => inputChangeHandler(event, id)}
    >
      <FormButton type="search" config={{ className: styles.btnSearch }} />
    </FormInput>
  ));

  const submitFormHandler = (e) => {
    e.preventDefault();

    if (formValidity) {
      router.push(`/search?q=${formControls.search.value}`);
    }
  };

  const tabClass = className({
    [styles.activeTab]: true,
  });
  
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <div className={styles.captions}>
            <p>It Feels Great to be home!</p>
            <h2>Find Your Perfect Home</h2>
          </div>
          <div className={styles.tabs}>
            <button className={tabClass}>Buy</button>
            <button>Rent</button>
          </div>
          <form onSubmit={(e) => submitFormHandler(e)} className={styles.form}>
            {formInputs}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Hero;
