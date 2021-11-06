import { useState } from "react";
import className from "classnames";
import Svg from "src/components/Svg/Svg";
import { updateObject, checkFormValidity } from "src/helpers";
import FormInput from "src/components/Form/FormInput/FormInput";
import FormButton from "src/components/Form/FormButton/FormButton";

import styles from "src/components/Search/SearchFilter/SearchFilter.module.scss";

function SearchFilter() {
  const [formControls, setFormControls] = useState({
    keyword: {
      label: {
        title: "",
        htmlFor: "keyword",
        classes: [styles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "text",
        id: "keyword",
        placeholder: "Enter Keyword",
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
        message: "Keyword is required",
      },
    },
    status: {
      label: {
        title: "",
        htmlFor: "propertystatus",
        classes: [styles.form__label],
      },
      elementType: "select",
      elementConfig: {
        options: [
          {
            value: "",
            display: "Property Status",
          },
        ],
        required: true,
        id: "propertystatus",
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
        message: "Property type is required",
      },
    },
    property: {
      label: {
        title: "",
        htmlFor: "propertytype",
        classes: [styles.form__label],
      },
      elementType: "select",
      elementConfig: {
        options: [
          {
            value: "",
            display: "Property Type",
          },
        ],
        required: true,
        id: "propertytype",
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
        message: "Property type is required",
      },
    },
    city: {
      label: {
        title: "",
        htmlFor: "city",
        classes: [styles.form__label],
      },
      elementType: "select",
      elementConfig: {
        options: [
          {
            value: "",
            display: "City",
          },
        ],
        required: true,
        id: "city",
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
        message: "City is required",
      },
    },
    bedroom: {
      label: {
        title: "",
        htmlFor: "bedroom",
        classes: [styles.form__label],
      },
      elementType: "select",
      elementConfig: {
        options: [
          {
            value: "",
            display: "Bedrooms",
          },
        ],
        id: "bedroom",
      },
      elementClasses: [styles.form__select],
      parentClasses: [styles.form__group],
      value: "",
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
      error: {
        message: "City is required",
      },
    },
    minPrice: {
      label: {
        title: "",
        htmlFor: "minprice",
        classes: [styles.form__label],
      },
      elementType: "number",
      elementConfig: {
        id: "minprice",
        placeholder: "Min. Price",
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
        message: "Min Price is required",
      },
    },
    maxPrice: {
      label: {
        title: "",
        htmlFor: "maxprice",
        classes: [styles.form__label],
      },
      elementType: "number",
      elementConfig: {
        id: "maxprice",
        placeholder: "Max. Price",
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
        message: "Max Price is required",
      },
    },
  });

  const [formValidity, setFormValidity] = useState(false);

  const [containerExpanded, setContainerExpanded] = useState(false);

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

    if (formValidity) {
    }
  };

  const containerClass = className({
    [styles.container]: true,
    [styles.expanded]: containerExpanded,
  });

  return (
    <div className={containerClass}>
      <div className={styles.title}>
        <button onClick={() => setContainerExpanded(!containerExpanded)}>
          <h3>Find your new home</h3>
          <Svg
            className={styles.iconsExpand}
            symbol={containerExpanded ? "minus" : "plus"}
          />
        </button>
      </div>
      <form className={styles.form}>
        {formInputs}
        <FormButton
          parentClasses={[styles.form__button]}
          type="search-filter"
          btnValue="Search"
        />
      </form>
    </div>
  );
}

export default SearchFilter;
