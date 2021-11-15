import className from "classnames";
import { useRouter } from "next/router";
import Svg from "src/components/Svg/Svg";
import { toggleTabBar } from "src/store/actions";
import { useIsMobile } from "src/hooks/mediaQuery";
import { MapContext } from "src/context/MapContext";
import { useSelector, useDispatch } from "react-redux";
import usePlacesAutocomplete from "use-places-autocomplete";
import { checkFormValidity, updateObject } from "src/helpers";
import { useContext, useRef, useState, useEffect } from "react";
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
        disabled: true,
        required: true,
        onBlur: () => onToggleTabBar(true),
        onFocus: () => onToggleTabBar(false),
        placeholder: "Enter an address, state, city or local goverment",
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

  const mapContext = useContext(MapContext);

  const dispatch = useDispatch();

  const formRef = useRef();

  const router = useRouter();

  const tabBar = useSelector((state) => state.tabBar);

  const [activeTab, setActiveTab] = useState(0);

  const isMobile = useIsMobile(599);

  const onToggleTabBar = (visibility) => dispatch(toggleTabBar(visibility));

  let formElementsArray = [];

  for (let key in formControls) {
    formElementsArray.push({
      id: key,
      config: formControls[key],
    });
  }

  const {
    init,
    ready,
    setValue,
    clearSuggestions,
    suggestions: { data },
  } = usePlacesAutocomplete({
    initOnMount: false,
    requestOptions: {
      componentRestrictions: { country: "ng" },
    },
  });

  useEffect(() => {
    if (mapContext.isReady) init();
  }, [mapContext]);

  useEffect(() => {
    if (isMobile && !tabBar.visibility) {
      router.push("/search?v=mobile");
    }
  }, [isMobile, tabBar]);
  useEffect(() => {
    if (ready) {
      setFormControls((prevFormControls) => ({
        ...prevFormControls,
        search: {
          ...prevFormControls.search,
          elementConfig: {
            ...prevFormControls.search.elementConfig,
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

    setValue(event.target.value);
    setFormValidity(formIsValid);
    setFormControls(updatededFormControls);
  };

  /** Iterate over all the form elements and return it to the view */
  let formInputs = formElementsArray.map(({ id, config }) => (
    <FormInput
      key={id}
      type="hero"
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
      <FormButton type="hero" config={{ className: styles.btnSearch }} />
    </FormInput>
  ));

  const onSelectPlace = (address) => {
    setValue(address, false);

    setFormControls(
      updateObject(formControls, {
        search: updateObject(formControls.search, {
          value: address,
        }),
      })
    );

    clearSuggestions();

    setTimeout(() => {
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }, 600);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    let filter = activeTab <= 0 ? "for-sale" : "for-rent";

    if (formValidity) {
      router.push(
        `/search?q=${formControls.search.value}&filter=${filter}&v=${
          isMobile ? "mobile" : "desktop"
        }`
      );
    }
  };

  const tabClass = (index) =>
    className({
      [styles.activeTab]: index === activeTab,
    });

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <div className={styles.captions}>
            <p>Making Real Estate Transparent</p>
            <h2>Find Your Perfect Home</h2>
          </div>
          <div className={styles.tabs}>
            <button onClick={() => setActiveTab(0)} className={tabClass(0)}>
              Buy
            </button>
            <button onClick={() => setActiveTab(1)} className={tabClass(1)}>
              Rent
            </button>
          </div>
          <form
            ref={formRef}
            className={styles.form}
            onSubmit={(e) => submitFormHandler(e)}
          >
            {formInputs}
            {data.length > 0 && (
              <div className={styles.form__dropdown}>
                <ul className={styles.form__dropdown_list}>
                  {data.map((address, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => onSelectPlace(address.description)}
                      >
                        <Svg
                          className={styles.iconMapPlace}
                          symbol="map-place"
                        />
                        <div>
                          <span>{address.structured_formatting.main_text}</span>
                          <span>
                            {address.structured_formatting.secondary_text}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Hero;
