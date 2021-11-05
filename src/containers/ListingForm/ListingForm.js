import { useState } from "react";
import { updateObject, checkFormValidity } from "src/helpers";
import FormInput from "src/components/Form/FormInput/FormInput";
import FormButton from "src/components/Form/FormButton/FormButton";

import styles from "src/containers/ListingForm/ListingForm.module.scss";

function ListingForm() {
  const [formControls, setFormControls] = useState({
    name: {
      label: {
        title: "",
        htmlFor: "name",
        classes: [styles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "text",
        id: "name",
        required: true,
        placeholder: "Property Name",
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
        message: "Property name is required",
      },
    },
    category: {
      label: {
        title: "",
        htmlFor: "category",
        classes: [styles.form__label],
      },
      elementType: "select",
      elementConfig: {
        id: "category",
        required: true,
        options: [
          { value: "", display: "-- Choose a Category --" },
          { value: "apartment", display: "Apartment" },
          { value: "office", display: "Office" },
          { value: "home", display: "Residential Home" },
          { value: "villa", display: "Villa" },
        ],
      },
      elementClasses: [styles.form__select],
      parentClasses: [styles.form__group],
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      error: {
        message: "Property category is required",
      },
    },
    status: {
      label: {
        title: "",
        htmlFor: "status",
        classes: [styles.form__label],
      },
      elementType: "select",
      elementConfig: {
        id: "status",
        required: true,
        options: [
          { value: "", display: "-- Property Status --" },
          { value: "for-sale", display: "For Sale" },
          { value: "for-rent", display: "For Rent" },
        ],
      },
      elementClasses: [styles.form__select],
      parentClasses: [styles.form__group],
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      error: {
        message: "Property status is required",
      },
    },
    price: {
      label: {
        title: "",
        htmlFor: "price",
        classes: [styles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "number",
        id: "price",
        required: true,
        placeholder: "Property Price (NGN)",
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
        message: "Property Price is required",
      },
    },
    keywords: {
      label: {
        title: "",
        htmlFor: "keywords",
        classes: [styles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "text",
        id: "keywords",
        required: true,
        placeholder: "Property Keywords e.g (5 Bedroom duplex, Jacuzzi)",
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
        message: "Property keywords is required",
      },
    },
    description: {
      label: {
        title: "",
        htmlFor: "description",
        classes: [styles.form__label],
      },
      elementType: "textarea",
      elementConfig: {
        id: "description",
        required: true,
        placeholder: "Property Description",
        rows: 7,
        autoComplete: "off",
      },
      elementClasses: [styles.form__textarea],
      parentClasses: [styles.form__group, styles.span__row_100],
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      error: {
        message: "Property descrption is required",
      },
    },
    beds: {
      label: {
        title: "",
        htmlFor: "beds",
        classes: [styles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "number",
        id: "beds",
        required: false,
        autoComplete: "off",
        min: 1,
        placeholder: "Bedrooms (optional)",
      },
      elementClasses: [styles.form__input],
      parentClasses: [styles.form__group],
      value: "",
      validation: {
        required: false,
        min: 1,
      },
      valid: true,
      touched: false,
      error: {
        message: "",
      },
    },
    baths: {
      label: {
        title: "",
        htmlFor: "baths",
        classes: [styles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "number",
        id: "baths",
        required: false,
        min: 1,
        placeholder: "Bathrooms (optional)",
        autoComplete: "off",
      },
      elementClasses: [styles.form__input],
      parentClasses: [styles.form__group],
      value: "",
      validation: {
        required: false,
        min: 1,
      },
      valid: true,
      touched: false,
      error: {
        message: "",
      },
    },
    garages: {
      label: {
        title: "",
        htmlFor: "garages",
        classes: [styles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "number",
        id: "garages",
        required: false,
        placeholder: "Garages (optional)",
        autoComplete: "off",
      },
      elementClasses: [styles.form__input],
      parentClasses: [styles.form__group],
      value: "",
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
      error: {
        message: "",
      },
    },
    area: {
      label: {
        title: "",
        htmlFor: "area",
        classes: [styles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "number",
        id: "area",
        required: true,
        placeholder: "Area (sqft)",
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
        message: "Area is required in Sq. ft",
      },
    },
    address: {
      label: {
        title: "",
        htmlFor: "address",
        classes: [styles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "text",
        id: "address",
        required: true,
        placeholder: "Friendly Address",
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
        message: "Address is required",
      },
    },
    zipcode: {
      label: {
        title: "",
        htmlFor: "zipcode",
        classes: [styles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "text",
        id: "zipcode",
        required: true,
        placeholder: "Zipcode",
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
        message: "Zip Code is required",
      },
    },
    country: {
      label: {
        title: "",
        htmlFor: "country",
        classes: [styles.form__label],
      },
      elementType: "select",
      elementConfig: {
        id: "country",
        required: true,
        autoComplete: "off",
        options: [{ value: "NG", display: "Nigeria" }],
      },
      elementClasses: [styles.form__input],
      parentClasses: [styles.form__group],
      value: "NG",
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
      error: {
        message: "",
      },
    },
    yearBuilt: {
      label: {
        title: "",
        htmlFor: "yearbuilt",
        classes: [styles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "text",
        id: "yearbuilt",
        required: true,
        autoComplete: "off",
        placeholder: "Year Built",
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
        message: "",
      },
    },
    images: {
      label: {
        title: "(Up to 25 images. 500 x 500 pixels)",
        htmlFor: "images",
        classes: [styles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "file",
        id: "images",
        multiple: true,
        required: true,
      },
      elementClasses: [styles.form__input],
      parentClasses: [styles.form__group],
      files: [],
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      error: {
        message: "At most 25 property images must be selected",
      },
    },
    features: {
      label: {
        title: "",
        htmlFor: "features",
        classes: [styles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "text",
        id: "features",
        required: true,
        placeholder: "Property Features e.g (Swimming pool, Gym)",
        autoComplete: "off",
      },
      elementClasses: [styles.form__input],
      parentClasses: [styles.form__group],
      value: "",
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
      error: {
        message: "",
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
    let updatededFormControls = null;

    if (formControlKey === "images") {
      updatededFormControls = updateObject(formControls, {
        [formControlKey]: updateObject(formControls[formControlKey], {
          files: [...event.target.files],
          value: event.target.value,
          valid:
            checkFormValidity(
              event.target.value,
              formControls[formControlKey].validation
            ) && event.target.files.length === 25,
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

  const submitFormHandler = (e) => {
    e.preventDefault();

    if (formValidity) {
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Submit New Listing</h2>
        <p>
          Tip:{" "}
          <span>
            Your listing will be verified and approved before it can be listed.
          </span>
        </p>
      </div>
      <form onSubmit={(e) => submitFormHandler(e)} className={styles.form}>
        <div className={styles.label}>
          <h3>Property Info</h3>
        </div>
        {formInputs.slice(0, 13)}
        <div className={styles.label}>
          <h3>Media</h3>
        </div>
        {formInputs.slice(14, 15)}
        <div className={styles.label}>
          <h3>Amenities</h3>
        </div>
        {formInputs.slice(15)}
        <FormButton
          btnValue="Submit Listing"
          parentClasses={[styles.form__button]}
        />
      </form>
    </div>
  );
}

export default ListingForm;
