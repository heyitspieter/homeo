import Image from "next/image";
import { useState, useEffect } from "react";
import { useGetProfile } from "src/hooks/user";
import FormInput from "src/components/Form/FormInput/FormInput";
import FormButton from "src/components/Form/FormButton/FormButton";

import {
  capitalize,
  checkFormValidity,
  getImageDataURL,
  updateObject,
} from "src/helpers";

import styles from "src/containers/Profile/Profile.module.scss";

function Profile() {
  const [formControls, setFormControls] = useState({
    firstname: {
      label: {
        title: "",
        htmlFor: "firstname",
        classes: [styles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "text",
        id: "firstname",
        required: true,
        placeholder: "First Name",
        autoComplete: "off",
      },
      elementClasses: [styles.form__input],
      parentClasses: [styles.form__group],
      value: "",
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
      error: {
        message: "Firstname is required",
      },
    },
    lastname: {
      label: {
        title: "",
        htmlFor: "lastname",
        classes: [styles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "text",
        id: "lastname",
        required: true,
        placeholder: "Last Name",
        autoComplete: "off",
      },
      elementClasses: [styles.form__input],
      parentClasses: [styles.form__group],
      value: "",
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
      error: {
        message: "Firstname is required",
      },
    },
    profession: {
      label: {
        title: "",
        htmlFor: "profession",
        classes: [styles.form__label],
      },
      elementType: "select",
      elementConfig: {
        id: "profession",
        required: true,
        options: [
          { value: "", display: "-- Select a Profession" },
          { value: "plumber", display: "Plumber" },
          { value: "bricklayer", display: "BrickLayer" },
          { value: "surveyor", display: "Surveyor" },
          { value: "architect", display: "Architect" },
          { value: "electrical engineer", display: "Electrical Engineer" },
        ],
      },
      elementClasses: [styles.form__select],
      parentClasses: [styles.form__group],
      value: "",
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
      error: {
        message: "Profession is required",
      },
    },
    email: {
      label: {
        title: "",
        htmlFor: "email",
        classes: [styles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "email",
        id: "email",
        required: true,
        placeholder: "Email Address",
        autoComplete: "off",
      },
      elementClasses: [styles.form__input],
      parentClasses: [styles.form__group],
      value: "",
      validation: {
        isEmail: true,
        required: true,
      },
      valid: true,
      touched: false,
      error: {
        message: "Email Address is required",
      },
    },
    mobile: {
      label: {
        title: "",
        htmlFor: "mobile",
        classes: [styles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "text",
        id: "mobile",
        required: true,
        placeholder: "Mobile Number (Will be displayed on your listings)",
        autoComplete: "off",
      },
      elementClasses: [styles.form__input],
      parentClasses: [styles.form__group],
      value: "",
      validation: {
        required: true,
        isMobilePhone: true,
      },
      valid: true,
      touched: false,
      error: {
        message: "Mobile Number is required",
      },
    },
    image: {
      label: {
        title: "",
        htmlFor: "image",
        classes: [styles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "file",
        id: "image",
        required: true,
      },
      elementClasses: [styles.form__input],
      parentClasses: [styles.form__group],
      file: null,
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      error: {
        message: "Image is required",
      },
    },
  });

  const [formValidity, setFormValidity] = useState(false);

  const { data: user, error, loading } = useGetProfile();

  const [imageSrc, setImageSrc] = useState("/images/avatar.jpg");

  let formElementsArray = [];

  for (let key in formControls) {
    formElementsArray.push({
      id: key,
      config: formControls[key],
    });
  }

  useEffect(() => {
    const file = formControls.image.file;

    if (file) {
      const onGetDataUrl = async (file) => {
        const image = await getImageDataURL(file);
        if (image) {
          setImageSrc(image.data.link);
        }
      };

      onGetDataUrl(file);
    }
  }, [formControls.image.file]);

  useEffect(() => {
    if (user) {
      setFormControls((prevFormControls) => ({
        ...prevFormControls,
        firstname: {
          ...prevFormControls.firstname,
          value: capitalize(user.firstname),
        },
        lastname: {
          ...prevFormControls.lastname,
          value: capitalize(user.lastname),
        },
        email: { ...prevFormControls.email, value: capitalize(user.email) },
        mobile: {
          ...prevFormControls.mobile,
          value: user.mobile ? user.mobile : "",
        },
        profession: { ...prevFormControls.profession, value: user.profession },
      }));
    }
  }, [user]);

  const inputChangeHandler = (event, formControlKey) => {
    let updatededFormControls = null;

    if (formControlKey === "image") {
      updatededFormControls = updateObject(formControls, {
        [formControlKey]: updateObject(formControls[formControlKey], {
          file: event.target.files[0],
          value: event.target.value,
          valid: checkFormValidity(
            event.target.value,
            formControls[formControlKey].validation
          ),
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

  return (
    <div className={styles.container}>
      <form onSubmit={(e) => submitFormHandler(e)} className={styles.form}>
        <div className={styles.form__inner}>
          <div className={styles.label}>
            <h3>Contact Information</h3>
          </div>
          {formInputs.slice(0, 5)}
          <FormButton
            btnValue="Save Changes"
            parentClasses={[styles.form__button]}
          />
        </div>
        <div className={styles.form__inner}>
          <h4>
            Photo <span>(min. 500px x 500px)</span>
          </h4>
          <figure>
            <Image
              layout="responsive"
              alt="Profile Image"
              src={imageSrc}
              height={140}
              width={140}
            />
          </figure>
          {formInputs.slice(5)}
        </div>
      </form>
    </div>
  );
}

export default Profile;
