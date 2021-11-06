import AuthButton from "src/components/Form/ButtonTemplates/AuthButton";
import SearchButton from "src/components/Form/ButtonTemplates/SearchButton";
import DefaultButton from "src/components/Form/ButtonTemplates/DefaultButton";
import HeroSearchButton from "src/components/Form/ButtonTemplates/HeroSearchButton";
import SearchhFilterButton from "src/components/Form/ButtonTemplates/SearchFilterButton";

const FormButton = ({
  type,
  config,
  btnValue,
  children,
  isLoading,
  parentClasses = [],
}) => {
  let buttonTemplate = null;

  switch (type) {
    case "hero":
      buttonTemplate = (
        <HeroSearchButton
          config={config}
          btnValue={btnValue}
          loading={isLoading}
          parentClasses={parentClasses}
        />
      );
      break;
    case "search-filter":
      buttonTemplate = (
        <SearchhFilterButton
          config={config}
          btnValue={btnValue}
          loading={isLoading}
          parentClasses={parentClasses}
        />
      );
      break;
    case "auth":
      buttonTemplate = (
        <AuthButton
          config={config}
          btnValue={btnValue}
          loading={isLoading}
          parentClasses={parentClasses}
        />
      );
      break;
    case "search":
      buttonTemplate = (
        <SearchButton
          config={config}
          btnValue={btnValue}
          loading={isLoading}
          parentClasses={parentClasses}
        />
      );
      break;
    default:
      buttonTemplate = (
        <DefaultButton
          config={config}
          btnValue={btnValue}
          loading={isLoading}
          parentClasses={parentClasses}
        />
      );
      break;
  }

  return <>{buttonTemplate}</>;
};

export default FormButton;
