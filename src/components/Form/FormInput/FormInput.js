import className from "classnames";
import Svg from "src/components/Svg/Svg";
import AuthForm from "src/components/Form/FormTemplates/AuthForm";
import SearchForm from "src/components/Form/FormTemplates/SearchForm";
import FinderForm from "src/components/Form/FormTemplates/FinderForm";
import ListingForm from "src/components/Form/FormTemplates/ListingForm";
import HeroSearchForm from "src/components/Form/FormTemplates/HeroSearchForm";
import ListingImageForm from "src/components/Form/FormTemplates/ListingImageForm";
import SearchFilterForm from "src/components/Form/FormTemplates/SearchFilterForm";

import { iconSelect, selectWrapper } from "styles/modules/Utility.module.scss";
import { labelError, inputError } from "styles/modules/Error.module.scss";

const FormInput = ({
  type,
  label,
  error,
  value,
  write,
  invalid,
  children,
  elementType,
  labelClasses,
  inputClasses,
  parentClasses,
  elementConfig,
  shouldValidate,
}) => {
  let inputElement = null;
  let inputTemplate = null;
  let validationMessage = null;

  /** Check if form input is invalid and has validation rules */
  const inputClass = className({
    [inputClasses.join(" ")]: true,
    [inputError]: invalid && shouldValidate,
  });

  const labelClass = className({
    [labelClasses.join(" ")]: true,
    [labelError]: invalid && shouldValidate,
  });

  if (invalid && shouldValidate) {
    validationMessage = error;
  }

  switch (elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClass}
          {...elementConfig}
          onChange={write}
          value={value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClass}
          {...elementConfig}
          onChange={write}
          value={value}
        />
      );
      break;
    case "select":
      const { options, ...selectProps } = elementConfig;

      inputElement = (
        <div className={selectWrapper}>
          <select
            className={inputClass}
            onChange={write}
            {...selectProps}
            value={value}
          >
            {elementConfig.options.map((option, index) => {
              return (
                <option
                  key={index}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.display}
                </option>
              );
            })}
          </select>
          <Svg className={iconSelect} symbol="chevron" />
        </div>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClass}
          {...elementConfig}
          onChange={write}
          value={value}
        />
      );
  }

  switch (type) {
    case "hero":
      inputTemplate = (
        <HeroSearchForm
          label={label}
          labelClasses={labelClass}
          inputElement={inputElement}
          parentClasses={parentClasses}
        >
          {children}
        </HeroSearchForm>
      );
      break;
    case "search-filter":
      inputTemplate = (
        <SearchFilterForm
          label={label}
          labelClasses={labelClass}
          inputElement={inputElement}
          parentClasses={parentClasses}
          validationMessage={validationMessage}
        />
      );
      break;
    case "auth":
      inputTemplate = (
        <AuthForm
          label={label}
          labelClasses={labelClass}
          inputElement={inputElement}
          parentClasses={parentClasses}
          validationMessage={validationMessage}
        >
          {children}
        </AuthForm>
      );
      break;
    case "listing":
      inputTemplate = (
        <ListingForm
          label={label}
          labelClasses={labelClass}
          inputElement={inputElement}
          parentClasses={parentClasses}
          validationMessage={validationMessage}
        >
          {children}
        </ListingForm>
      );
      break;
    case "listing-image":
      inputTemplate = (
        <ListingImageForm
          label={label}
          labelClasses={labelClass}
          inputElement={inputElement}
          parentClasses={parentClasses}
          imageSrc={elementConfig.datasrc}
          validationMessage={validationMessage}
        />
      );
      break;
    case "search":
      inputTemplate = (
        <SearchForm
          label={label}
          labelClasses={labelClass}
          inputElement={inputElement}
          parentClasses={parentClasses}
          validationMessage={validationMessage}
        >
          {children}
        </SearchForm>
      );
      break;
    case "finder":
      inputTemplate = (
        <FinderForm
          label={label}
          labelClasses={labelClass}
          inputElement={inputElement}
          parentClasses={parentClasses}
          validationMessage={validationMessage}
        />
      );
      break;
    default:
      inputTemplate = null;
      break;
  }

  return <>{inputTemplate}</>;
};

export default FormInput;
