import Image from "next/image";
import { useSWRConfig } from "swr";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSignout } from "src/hooks/auth";
import { useUpdatePassword } from "src/hooks/user";
import { checkFormValidity, updateObject } from "src/helpers";
import FormInput from "src/components/Form/FormInput/FormInput";
import FormButton from "src/components/Form/FormButton/FormButton";

import styles from "src/containers/AccountSetting/AccountSetting.module.scss";

function AccountSetting() {
  const [formControls, setFormControls] = useState({
    oldPassword: {
      label: {
        title: "",
        htmlFor: "oldpassword",
        classes: [styles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "password",
        id: "oldpassword",
        required: true,
        placeholder: "Old Password",
        autoComplete: "off",
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
        message: "Old Password is required",
      },
    },
    newPassword: {
      label: {
        title: "",
        htmlFor: "newpassword",
        classes: [styles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "password",
        id: "newpassword",
        required: true,
        placeholder: "New Password",
        autoComplete: "off",
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
        message: "New Password is required",
      },
    },
    confirmPassword: {
      label: {
        title: "",
        htmlFor: "confirmpassword",
        classes: [styles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "password",
        id: "confirmpassword",
        required: true,
        placeholder: "Confirm New Password",
        autoComplete: "off",
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
        message: "Confirm Password is required",
      },
    },
  });

  const [formValidity, setFormValidity] = useState(false);

  const router = useRouter();

  const { mutate } = useSWRConfig();

  const [
    updatePassword,
    { data: success, error: updateErr, loading: updating },
  ] = useUpdatePassword();

  const [signout, { data: signedOut, error: signoutErr, loading: signingOut }] =
    useSignout();

  let formElementsArray = [];

  for (let key in formControls) {
    formElementsArray.push({
      id: key,
      config: formControls[key],
    });
  }

  useEffect(() => {
    if (signedOut) {
      router.replace("/");
      mutate("/api/v1/user/session");
      toast.success("Signed Out!! Come back soon :)");
    }

    if (signoutErr) toast.error(signoutErr);
  }, [signedOut, signoutErr]);

  useEffect(() => {
    if (success) {
      let newFormControls = { ...formControls };

      for (let key in newFormControls) {
        newFormControls[key].value = "";
        newFormControls[key].valid = false;
        newFormControls[key].touched = false;
      }

      setFormControls((prevFormControls) => ({
        ...prevFormControls,
        ...newFormControls,
      }));

      toast.success("Password changed successfully");
    }

    if (updateErr) {
      setFormControls((prevFormControls) => ({
        ...prevFormControls,
        oldPassword: {
          ...prevFormControls.oldPassword,
          value: "",
          valid: false,
          touched: false,
        },
      }));
      toast.error(updateErr);
    }
  }, [success, updateErr]);

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
      type="listing"
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
    />
  ));

  const submitFormHandler = (e) => {
    e.preventDefault();

    let formData = {};

    for (let key in formControls) {
      formData[key] = formControls[key].value;
    }

    if (formValidity) updatePassword(formData);
  };

  const btnConfig = {
    disabled: !formValidity || updating,
  };

  return (
    <div className={styles.container}>
      <form onSubmit={(e) => submitFormHandler(e)} className={styles.form}>
        <div className={styles.form__inner}>
          <div className={styles.label}>
            <h3>Change Password</h3>
          </div>
          {formInputs}
          <FormButton
            config={btnConfig}
            parentClasses={[styles.form__button]}
            btnValue={`${updating ? "Please wait..." : "Change Password"}`}
          />
        </div>
        <div className={styles.form__inner}>
          <div className={styles.label}>
            <h3>Sign out of your Account</h3>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              signout();
              mutate("/api/v1/user/session", { guest: true }, false);
            }}
          >
            {`${signingOut ? "Signing out.." : "Sign Out"}`}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AccountSetting;
