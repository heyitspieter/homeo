import className from "classnames";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useCreateJobRequest } from "src/hooks/job-request";
import { updateObject, checkFormValidity } from "src/helpers";
import FormInput from "src/components/Form/FormInput/FormInput";
import FormButton from "src/components/Form/FormButton/FormButton";

import formStyles from "styles/modules/Form.module.scss";
import styles from "src/containers/Finder/JobInfo/JobInfo.module.scss";

const JobInfo = ({
  jobData,
  setJobData,
  closeFinder,
  currentStep,
  setCurrentStep,
}) => {
  const [formControls, setFormControls] = useState({
    description: {
      label: {
        title: "",
        htmlFor: "description",
        classes: [],
      },
      elementType: "textarea",
      elementConfig: {
        id: "description",
        required: true,
        rows: 7,
        placeholder: "Brief description of what you are looking for",
        autoComplete: "off",
      },
      elementClasses: [formStyles.form__textarea],
      parentClasses: [styles.form__group],
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      error: {
        message: "Description is required",
      },
    },
    files: {
      label: {
        title: "Upload Files (optional)",
        htmlFor: "media",
        classes: [formStyles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "file",
        id: "media",
        multiple: true,
        required: false,
      },
      elementClasses: [formStyles.form__input],
      parentClasses: [styles.form__group],
      files: [],
      value: "",
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
      error: {
        message: "Please select at most 6 files",
      },
    },
    contact: {
      label: {
        title: "How would you like us to contact you?",
        htmlFor: "contact",
        classes: [formStyles.form__label],
      },
      elementType: "select",
      elementConfig: {
        id: "contact",
        required: true,
        autoComplete: "off",
        options: [
          { value: "", display: "-- select contact info --" },
          { value: "phone", display: "Phone Number" },
          { value: "email", display: "Email Address" },
        ],
      },
      elementClasses: [formStyles.form__textarea],
      parentClasses: [styles.form__group],
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      error: {
        message: "Cotact is required",
      },
    },
  });

  const [formValidity, setFormValidity] = useState(false);

  const [createJobRequest, { data: success, error, loading }] =
    useCreateJobRequest();

  let formElementsArray = [];

  for (let key in formControls) {
    formElementsArray.push({
      id: key,
      config: formControls[key],
    });
  }

  useEffect(() => {
    if (success) {
      resetFormInputs();
      closeFinder();
      toast.success(
        "Job request sent! We'll notify you via your preferred contact method"
      );
    }

    if (error) {
      toast.error(error);
    }
  }, [success, error]);

  useEffect(() => {
    const value = formControls.contact.value;

    if (["phone", "email"].includes(value)) {
      const { options, ...rest } = formControls.contact.elementConfig;

      setFormControls((prevFormControls) => ({
        ...prevFormControls,
        contact: {
          ...prevFormControls.contact,
          label: {
            ...prevFormControls.contact.label,
            title:
              value === "phone"
                ? "Enter your phone number"
                : "Enter your email address",
          },
          value: "",
          elementType: "input",
          elementConfig: {
            ...rest,
            type: "text",
          },
          validation: {
            ...prevFormControls.contact.validation,
            isEmail: value === "email" ? true : false,
            isMobilePhone: value === "phone" ? true : false,
          },
          error: {
            message:
              value === "phone"
                ? "Valid phone number is required"
                : "Email address is required",
          },
        },
      }));
    }
  }, [formControls.contact.value]);

  const inputChangeHandler = (event, formControlKey) => {
    let updatededFormControls = null;

    if (formControlKey === "files") {
      updatededFormControls = updateObject(formControls, {
        [formControlKey]: updateObject(formControls[formControlKey], {
          files: [...event.target.files],
          value: event.target.value,
          valid:
            checkFormValidity(
              event.target.value,
              formControls[formControlKey].validation
            ) && event.target.files.length <= 6,
          touched: true,
        }),
      });
    } else {
      updatededFormControls = updateObject(formControls, {
        [formControlKey]: updateObject(formControls[formControlKey], {
          value: event.target.value,
          valid: checkFormValidity(
            event.target.value,
            formControls[formControlKey].validation
          ),
          touched: true,
        }),
      });
    }

    let formIsValid = true;

    for (let key in updatededFormControls) {
      formIsValid = updatededFormControls[key].valid && formIsValid;
    }

    setJobData((prevState) => ({
      ...prevState,
      [formControlKey]:
        formControlKey === "files"
          ? [...event.target.files]
          : event.target.value,
    }));

    setFormValidity(formIsValid);
    setFormControls(updatededFormControls);
  };

  const resetFormInputs = (keys = []) => {
    let newFormControls = { ...formControls };

    if (keys.length > 0) {
      for (let key in keys) {
        newFormControls[keys[key]].value = "";
        newFormControls[keys[key]].valid = false;
        newFormControls[keys[key]].touched = false;
      }
    } else {
      for (let key in newFormControls) {
        newFormControls[key].value = "";
        newFormControls[key].valid = false;
        newFormControls[key].touched = false;
      }
    }

    setFormControls((prevFormControls) => ({
      ...prevFormControls,
      ...newFormControls,
    }));
  };

  /** Iterate over all the form elements and return it to the view */
  let formInputs = formElementsArray.map(({ id, config }) => (
    <FormInput
      key={id}
      type="finder"
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

    let formData = new FormData();

    for (let key in jobData) {
      if (key !== "files") {
        formData.append(key, jobData[key]);
      }
    }

    if (jobData.files.length > 0) {
      for (let i = 0; i < jobData.files.length; i++) {
        formData.append("file", jobData.files[i]);
      }
    }

    if (formValidity) createJobRequest(formData);
  };

  const containerClass = className({
    [styles.container]: true,
    [styles.translateX_in__left]: currentStep === 1,
  });

  const btnConfig = {
    disabled: !formValidity || loading,
    setCurrentStep: (step) => setCurrentStep(step),
  };

  return (
    <div className={containerClass}>
      <div className={styles.title}>
        <h2>Tell us more</h2>
      </div>
      <form
        className={styles.form}
        encType="multipart/form-data"
        onSubmit={(e) => submitFormHandler(e)}
      >
        {formInputs}
        <FormButton
          type="finder"
          config={btnConfig}
          parentClasses={[styles.action]}
          btnValue={loading ? "Submitting" : "Submit Request"}
        />
      </form>
    </div>
  );
};

export default JobInfo;
