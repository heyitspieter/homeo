import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useAuth } from "src/context/AuthContext";
import { MapContext } from "src/context/MapContext";
import { useCreateListing } from "src/hooks/listing";
import { useContext, useEffect, useState } from "react";
import FormInput from "src/components/Form/FormInput/FormInput";
import FormButton from "src/components/Form/FormButton/FormButton";
import { updateObject, checkFormValidity, getImageDataURL } from "src/helpers";
import ListingFormDropdown from "src/containers/ListingForm/ListingFormDropdown/ListingFormDropdown";

import usePlacesAutocomplete, {
  getLatLng,
  getGeocode,
} from "use-places-autocomplete";

import styles from "src/containers/ListingForm/ListingForm.module.scss";

function ListingForm({ toggleAuthModal }) {
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
        placeholder: "Property Name (optional)",
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
          { value: "penthouse", display: "Penthouse" },
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
        type: "text",
        id: "price",
        required: true,
        placeholder: "Property Price (NGN)",
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
        placeholder: "Property Keywords e.g (penthouse, house, Jacuzzi)",
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
        min: 0,
        placeholder: "Bedrooms (optional)",
      },
      elementClasses: [styles.form__input],
      parentClasses: [styles.form__group],
      value: "",
      validation: {
        required: false,
        min: 0,
      },
      valid: true,
      touched: false,
      error: {
        message: "",
      },
    },
    parlors: {
      label: {
        title: "",
        htmlFor: "parlors",
        classes: [styles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "number",
        id: "parlors",
        required: false,
        min: 0,
        placeholder: "Living Rooms (optional)",
      },
      elementClasses: [styles.form__input],
      parentClasses: [styles.form__group],
      value: "",
      validation: {
        required: false,
        min: 0,
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
        min: 0,
        placeholder: "Bathrooms (optional)",
      },
      elementClasses: [styles.form__input],
      parentClasses: [styles.form__group],
      value: "",
      validation: {
        required: false,
        min: 0,
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
        min: 0,
        required: false,
        placeholder: "Garages (optional)",
      },
      elementClasses: [styles.form__input],
      parentClasses: [styles.form__group],
      value: "",
      validation: {
        min: 0,
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
        type: "text",
        id: "area",
        required: false,
        placeholder: "Area (sqft)",
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
    location: {
      label: {
        title: "",
        htmlFor: "location",
        classes: [styles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "text",
        id: "location",
        required: true,
        placeholder: "Property  Location e.g (Ajah, Lekki Phase 1)",
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
        message: "Location is required",
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

  const router = useRouter();

  const [geoLocation, setGeoLocation] = useState(null);

  const [createListing, { data, error, loading }] = useCreateListing();

  const { isAuthenticated } = useAuth();

  const mapContext = useContext(MapContext);

  const { init, ready, setValue, suggestions, clearSuggestions } =
    usePlacesAutocomplete({
      initOnMount: false,
      requestOptions: {
        componentRestrictions: { country: "ng" },
      },
    });

  let formElementsArray = [];

  for (let key in formControls) {
    formElementsArray.push({
      id: key,
      config: formControls[key],
    });
  }

  useEffect(() => {
    let timer = null;

    if (data) {
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

      toast.success("Listing saved successfully");

      setTimeout(() => {
        router.push(`/listing/upload/${data.listingId}`);
      }, 400);
    }

    if (error) {
      toast.error(error);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [data, error]);

  useEffect(() => {
    if (mapContext.isReady && isAuthenticated) init();
  }, [mapContext, isAuthenticated]);

  useEffect(() => {
    if (ready) {
      setFormControls((prevFormControls) => ({
        ...prevFormControls,
        location: {
          ...prevFormControls.location,
          elementConfig: {
            ...prevFormControls.location.elementConfig,
            disabled: !ready,
          },
        },
      }));
    }
  }, [ready]);

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

    if (formControlKey === "location") {
      setValue(event.target.value);
    }

    setFormValidity(formIsValid);
    setFormControls(updatededFormControls);
  };

  const onSelectPlace = async (address) => {
    setValue(address, false);

    setFormControls(
      updateObject(formControls, {
        location: updateObject(formControls.location, {
          value: address,
        }),
      })
    );

    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);

      const location = { lat, lng, address };

      setGeoLocation(location);
    } catch (error) {
      console.log("Error: ", error);
    }
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
    >
      {id === "location" && (
        <ListingFormDropdown
          data={suggestions.data}
          onSelectPlace={onSelectPlace}
        />
      )}
    </FormInput>
  ));

  const submitFormHandler = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toggleAuthModal();
    }

    let formData = {};

    if (formValidity) {
      for (let key in formControls) {
        if (key !== "location") {
          formData[key] = formControls[key].value;
        }
      }

      formData["location"] = geoLocation;

      createListing(formData);
    }
  };

  const btnConfig = {
    disabled: !formValidity || loading,
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
      <form className={styles.form} onSubmit={(e) => submitFormHandler(e)}>
        <div className={styles.label}>
          <h3>Property Info</h3>
        </div>
        {formInputs.slice(0, 16)}
        <div className={styles.label}>
          <h3>Amenities</h3>
        </div>
        {formInputs.slice(16)}
        <FormButton
          config={btnConfig}
          parentClasses={[styles.form__button]}
          btnValue={loading ? "Please wait..." : "Next"}
        />
      </form>
    </div>
  );
}

export default ListingForm;
