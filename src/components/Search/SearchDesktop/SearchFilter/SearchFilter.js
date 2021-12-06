import className from "classnames";
import { useRouter } from "next/router";
import Svg from "src/components/Svg/Svg";
import { useState, useEffect } from "react";
import { updateObject, checkFormValidity } from "src/helpers";
import FormInput from "src/components/Form/FormInput/FormInput";
import FormButton from "src/components/Form/FormButton/FormButton";

import styles from "src/containers/Search/SearchDesktop/SearchDesktop.module.scss";

function SearchFilter({ mobile, applyFilters }) {
  const [formControls, setFormControls] = useState({
    keywords: {
      label: {
        title: "",
        htmlFor: "keyword",
        classes: [styles.filter__form_label],
      },
      elementType: "input",
      elementConfig: {
        type: "text",
        id: "keyword",
        placeholder: "e.g Penthouse, Jacuzzi",
      },
      elementClasses: [styles.filter__form_input],
      parentClasses: [styles.filter__form_group],
      value: "",
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
      error: {
        message: "Keyword is required",
      },
    },
    status: {
      label: {
        title: "",
        htmlFor: "propertystatus",
        classes: [styles.filter__form_label],
      },
      elementType: "select",
      elementConfig: {
        options: [
          {
            value: "",
            display: "Property Status",
          },
          {
            value: "all",
            display: "All",
          },
          {
            value: "for-sale",
            display: "For Sale",
          },
          {
            value: "for-rent",
            display: "For Rent",
          },
        ],
        required: true,
        id: "propertystatus",
      },
      elementClasses: [styles.filter__form_select],
      parentClasses: [styles.filter__form_group],
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      error: {
        message: "Property type is required",
      },
    },
    category: {
      label: {
        title: "",
        htmlFor: "propertytype",
        classes: [styles.filter__form_label],
      },
      elementType: "select",
      elementConfig: {
        options: [
          {
            value: "",
            display: "Property Type",
          },
          { value: "apartment", display: "Apartment" },
          { value: "office", display: "Office" },
          { value: "home", display: "Residential Home" },
          { value: "penthouse", display: "Penthouse" },
          { value: "villa", display: "Villa" },
        ],
        required: false,
        id: "propertytype",
      },
      elementClasses: [styles.filter__form_select],
      parentClasses: [styles.filter__form_group],
      value: "",
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
      error: {
        message: "Property type is required",
      },
    },
    beds: {
      label: {
        title: "",
        htmlFor: "bedroom",
        classes: [styles.filter__form_label],
      },
      elementType: "input",
      elementConfig: {
        type: "number",
        id: "bedroom",
        min: 1,
        placeholder: "Bedrooms",
      },
      elementClasses: [styles.filter__form_select],
      parentClasses: [styles.filter__form_group],
      value: "",
      validation: {
        min: 1,
        required: false,
      },
      valid: true,
      touched: false,
      error: {
        message: "Bedroom is required",
      },
    },
    baths: {
      label: {
        title: "",
        htmlFor: "bathroom",
        classes: [styles.filter__form_label],
      },
      elementType: "input",
      elementConfig: {
        type: "number",
        id: "bathroom",
        min: 1,
        placeholder: "Bathrooms",
      },
      elementClasses: [styles.filter__form_select],
      parentClasses: [styles.filter__form_group],
      value: "",
      validation: {
        min: 1,
        required: false,
      },
      valid: true,
      touched: false,
      error: {
        message: "Bedroom is required",
      },
    },
    minPrice: {
      label: {
        title: "",
        htmlFor: "minprice",
        classes: [styles.filter__form_label],
      },
      elementType: "input",
      elementConfig: {
        id: "minprice",
        type: "text",
        placeholder: "Min. Price",
      },
      elementClasses: [styles.filter__form_input],
      parentClasses: [styles.filter__form_group],
      value: "",
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
      error: {
        message: "Min Price is required",
      },
    },
    maxPrice: {
      label: {
        title: "",
        htmlFor: "maxprice",
        classes: [styles.filter__form_label],
      },
      elementType: "input",
      elementConfig: {
        id: "maxprice",
        type: "text",
        placeholder: "Max. Price",
      },
      elementClasses: [styles.filter__form_input],
      parentClasses: [styles.filter__form_group],
      value: "",
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
      error: {
        message: "Max Price is required",
      },
    },
  });

  const [formValidity, setFormValidity] = useState(false);

  const [containerExpanded, setContainerExpanded] = useState(false);

  const router = useRouter();

  let formElementsArray = [];

  for (let key in formControls) {
    formElementsArray.push({
      id: key,
      config: formControls[key],
    });
  }

  useEffect(() => {
    if (router.query.filter) {
      setFormControls((prevFormControls) => ({
        ...prevFormControls,
        status: {
          ...prevFormControls.status,
          value: router.query.filter,
          valid: true,
        },
      }));
    }
  }, []);

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
      type="search-filter"
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
      if (
        formControls[key].touched &&
        formControls[key].value.trim().length > 0
      ) {
        if (formControls[key].elementConfig.type === "number") {
          formData[key] = +formControls[key].value;
        } else {
          formData[key] = formControls[key].value;
        }
      }
    }

    if (formValidity) {
      applyFilters(router.query.q, formData);
    }
  };

  const containerClass = className({
    [styles.filter]: true,
    [styles.no__display]: !mobile ? false : true,
    [styles.expanded]: !mobile ? true : containerExpanded,
  });

  return (
    <div className={containerClass}>
      <div className={styles.filter__title}>
        <button onClick={() => setContainerExpanded(!containerExpanded)}>
          <h3>Find your new home</h3>
          <Svg
            className={styles.iconsExpand}
            symbol={containerExpanded ? "minus" : "plus"}
          />
        </button>
      </div>
      <form
        onSubmit={(e) => submitFormHandler(e)}
        className={styles.filter__form}
      >
        {formInputs}
        <FormButton
          btnValue="Search"
          type="search-filter"
          parentClasses={[styles.filter__form_button]}
        />
      </form>
    </div>
  );
}

export default SearchFilter;
