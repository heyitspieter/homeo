import { useState } from "react";
import className from "classnames";
import { updateObject, checkFormValidity } from "src/helpers";
import FormInput from "src/components/Form/FormInput/FormInput";
import FormButton from "src/components/Form/FormButton/FormButton";

import formStyles from "styles/modules/Form.module.scss";
import styles from "src/components/Modals/AuthModal/AuthModal.module.scss";

function Login({ activeTab }) {
  const [formControls, setFormControls] = useState({
    email: {
      label: {
        title: "Email Address",
        htmlFor: "login_email",
        classes: [formStyles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "email",
        id: "login_email",
        required: true,
        placeholder: "Email Address",
        autoComplete: "off",
      },
      elementClasses: [formStyles.form__input],
      parentClasses: [formStyles.form__group],
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      error: {
        message: "Email Address is required",
      },
    },
    password: {
      label: {
        title: "Password",
        htmlFor: "login_password",
        classes: [formStyles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "password",
        id: "login_password",
        required: true,
        placeholder: "Password",
        autoComplete: "off",
      },
      elementClasses: [formStyles.form__input],
      parentClasses: [formStyles.form__group],
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      error: {
        message: "Password is required",
      },
    },
  });

  const [formValidity, setFormValidity] = useState(false);

  let formElementsArray = [];

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

  const togglePassword = () => {
    setFormControls(
      updateObject(formControls, {
        password: updateObject(formControls.password, {
          elementConfig: updateObject(formControls.password.elementConfig, {
            type:
              formControls.password.elementConfig.type === "text"
                ? "password"
                : "text",
          }),
        }),
      })
    );
  };

  /** Iterate over all the form elements and return it to the view */
  let formInputs = formElementsArray.map(({ id, config }) => (
    <FormInput
      key={id}
      type="auth"
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
      <span onClick={togglePassword} className={formStyles.passwordRevealer}>
        {formControls.password.elementConfig.type === "text" ? "Hide" : "Show"}
      </span>
    </FormInput>
  ));

  const submitFormHandler = (e) => {
    e.preventDefault();

    if (formValidity) {
    }
  };

  const containerClass = className({
    [formStyles.container]: true,
    [styles.formSlider__item]: true,
  });

  return (
    <div id="Login" className={containerClass}>
      <form onSubmit={(e) => submitFormHandler(e)} className={formStyles.form}>
        {formInputs}
        <FormButton
          parentClasses={[formStyles.form__button]}
          btnValue="Submit"
          type="auth"
        />
      </form>
    </div>
  );
}

export default Login;
