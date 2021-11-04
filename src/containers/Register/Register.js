import { useState } from "react";
import className from "classnames";
import { updateObject, checkFormValidity } from "src/helpers";
import FormInput from "src/components/Form/FormInput/FormInput";
import FormButton from "src/components/Form/FormButton/FormButton";

import formStyles from "styles/modules/Form.module.scss";
import styles from "src/components/Modals/AuthModal/AuthModal.module.scss";

function Register({ activeTab }) {
  const [formControls, setFormControls] = useState({
    firstname: {
      label: {
        title: "First Name",
        htmlFor: "firstname",
        classes: [formStyles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "text",
        id: "firstname",
        required: true,
        placeholder: "First Name",
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
        message: "First Name is required",
      },
    },
    lastname: {
      label: {
        title: "Last Name",
        htmlFor: "lastname",
        classes: [formStyles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "text",
        id: "lastname",
        required: true,
        placeholder: "Last Name",
        autoComplete: "off",
      },
      elementClasses: [formStyles.form__input],
      parentClasses: [formStyles.form__group, formStyles.zIndex],
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      error: {
        message: "Last Name is required",
      },
    },
    profession: {
      label: {
        title: "Profession",
        htmlFor: "lastname",
        classes: [formStyles.form__label],
      },
      elementType: "select",
      elementConfig: {
        id: "profession",
        required: true,
        options: [
          { value: "", display: "-- choose your profession --" },
          { value: "bricklayer", display: "BrickLayer" },
          { value: "surveyor", display: "Surveyor" },
          { value: "architect", display: "Architect" },
        ],
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
        message: "Profession is required",
      },
    },
    email: {
      label: {
        title: "Email Address",
        htmlFor: "register_email",
        classes: [formStyles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "email",
        id: "register_email",
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
        htmlFor: "register_password",
        classes: [formStyles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "password",
        id: "register_password",
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

  const [formExpanded, setFormExpanded] = useState(false);

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
    [styles.no_height]: activeTab <= 0,
  });

  return (
    <div id="Register" className={containerClass}>
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

export default Register;
