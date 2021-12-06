import { useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toggleTabBar } from "src/store/actions";
import { useApplyFilter } from "src/hooks/search";
import { MapContext } from "src/context/MapContext";
import { useSearchListings } from "src/hooks/search";
import { useContext, useState, useEffect } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import { updateObject, checkFormValidity } from "src/helpers";
import FormInput from "src/components/Form/FormInput/FormInput";
import FormButton from "src/components/Form/FormButton/FormButton";
import SearchFormFilter from "src/components/Search/SearchMobile/SearchForm/SearchFormFilter/SearchFormFilter";
import SearchFormResults from "src/components/Search/SearchMobile/SearchForm/SearchFormResults/SearchFormResults";
import SearchFormDropdown from "src/components/Search/SearchMobile/SearchForm/SearchFormDropdown/SearchFormDropdown";

import styles from "src/components/Search/SearchMobile/SearchForm/SearchForm.module.scss";

function SearchForm() {
  const inputRef = useRef();

  const [formControls, setFormControls] = useState({
    query: {
      label: {
        title: "",
        htmlFor: "query",
        classes: [styles.form__label],
      },
      elementType: "input",
      elementConfig: {
        type: "text",
        id: "query",
        ref: inputRef,
        required: true,
        autoComplete: "off",
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
      valid: true,
      touched: false,
      error: {
        message: "Query is required",
      },
    },
  });

  const formRef = useRef();

  const router = useRouter();

  const [applyFilter, { loading }] = useApplyFilter();

  const [formValidity, setFormValidity] = useState(true);

  const [searchListings, { data: results, loading: searching }] =
    useSearchListings();

  const [searchFilter, setSearchFilter] = useState({
    visibility: false,
  });

  const [searchResults, setSearchResults] = useState([]);

  const mapContext = useContext(MapContext);

  const dispatch = useDispatch();

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

  const onToggleTabBar = (visibility) => dispatch(toggleTabBar(visibility));

  let formElementsArray = [];

  for (let key in formControls) {
    formElementsArray.push({
      id: key,
      config: formControls[key],
    });
  }

  useEffect(() => {
    if (router.query.q) {
      searchListings(router.query.q);
      setFormControls((prevFormControls) => ({
        ...prevFormControls,
        query: { ...prevFormControls.query, value: router.query.q },
      }));
    }

    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (results) {
      setSearchResults(results);
    }
  }, [results]);

  useEffect(() => {
    if (mapContext.isReady) init();
  }, [mapContext]);

  useEffect(() => {
    if (ready) {
      setFormControls((prevFormControls) => ({
        ...prevFormControls,
        query: {
          ...prevFormControls.query,
          elementConfig: {
            ...prevFormControls.query.elementConfig,
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

    if (event.target.value.length > 0) {
      setSearchResults([]);
    }

    setValue(event.target.value);
    setFormValidity(formIsValid);
    setFormControls(updatededFormControls);
  };

  /** Iterate over all the form elements and return it to the view */
  let formInputs = formElementsArray.map(({ id, config }) => (
    <FormInput
      key={id}
      type="search"
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
      <FormButton config={{ className: styles.form__button }} type="search" />
    </FormInput>
  ));

  const onSelectPlace = (address) => {
    setValue(address, false);

    setFormControls(
      updateObject(formControls, {
        query: updateObject(formControls.query, {
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

  const toggleSearchFilter = () => {
    setSearchFilter(
      updateObject(searchFilter, {
        visibility: !searchFilter.visibility,
      })
    );
  };

  const onApplyFilters = async (addr, filters) => {
    toggleSearchFilter();
    setSearchResults([]);

    const [data, err] = await applyFilter(addr, filters);

    if (data) {
      setSearchResults(data);
    }

    if (err) {
      toast.error(err);
    }
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    let formData = {};

    for (let key in formControls) {
      formData[key] = formControls[key].value;
    }

    if (formValidity) {
      router
        .push(`/search?q=${formControls.query.value}&v=mobile`)
        .then((fulfilled) => {
          if (fulfilled) {
            searchListings(formControls.query.value);
          }
        });
    }
  };

  return (
    <>
      <SearchFormFilter
        close={toggleSearchFilter}
        applyFilters={onApplyFilters}
        show={searchFilter.visibility}
      />
      <div className={styles.container}>
        <form
          ref={formRef}
          className={styles.form}
          onSubmit={(e) => submitFormHandler(e)}
        >
          {formInputs}
        </form>
        <div className={styles.container__flex}>
          <SearchFormDropdown
            data={data}
            count={searchResults.length}
            onSelectPlace={onSelectPlace}
            searching={searching || loading}
          />
          <SearchFormResults
            count={searchResults.length}
            searchResults={searchResults}
            toggleSearchFilter={toggleSearchFilter}
          />
        </div>
      </div>
    </>
  );
}

export default SearchForm;
