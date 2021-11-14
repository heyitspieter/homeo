import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUploadImage, useGetImage } from "src/hooks/listing";
import FormInput from "src/components/Form/FormInput/FormInput";
import { updateObject, checkFormValidity, getImageDataURL } from "src/helpers";

import styles from "src/containers/ListingForm/ListingForm.module.scss";

function ListingUploadForm({ toggleAuthModal, images }) {
  const [formControls, setFormControls] = useState({});

  const [lastUpdatedKey, setLastUpdatedKey] = useState(null);

  const [formValidity, setFormValidity] = useState(false);

  const [uploadError, setUploadError] = useState(false);

  const [uploadImage, { data: success, error, loading: uploading }] =
    useUploadImage();

  const router = useRouter();

  let formElementsArray = [];

  for (let key in formControls) {
    formElementsArray.push({
      id: key,
      config: formControls[key],
    });
  }

  useEffect(() => {
    let imageFormControls = {};

    let imageObject = {
      label: {
        title: "(Up to 15 images. 500 x 500 pixels)",
        htmlFor: "image",
        classes: [styles.form__imageTag],
      },
      elementType: "input",
      elementConfig: {
        type: "file",
        id: "image",
        datasrc: "",
      },
      elementClasses: [styles.form__image],
      parentClasses: [styles.form__group],
      file: null,
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      error: {
        message: "Property image must be selected",
      },
    };

    for (let i = 0; i < 15; i++) {
      imageFormControls = {
        ...imageFormControls,
        [`image-${i}`]: {
          ...imageObject,
          label: {
            ...imageObject.label,
            htmlFor: `image-${i}`,
            title: i <= 0 ? "Cover Image" : `Thumbnail ${i}`,
          },
          elementConfig: {
            ...imageObject.elementConfig,
            datasrc: images[i]
              ? `${process.env.NEXT_PUBLIC_SERVER_IMAGE_URL}/${images[i]}`
              : null,
            id: `image-${i}`,
          },
        },
      };
    }

    setFormControls((prevFormControls) => ({
      ...prevFormControls,
      ...imageFormControls,
    }));
  }, []);

  useEffect(() => {
    if (lastUpdatedKey) {
      let image = null;

      const onGetDataUri = async () => {
        const uploadedFile = formControls[lastUpdatedKey].file;

        if (uploadedFile) {
          if (runValidation(uploadedFile)) {
            image = await getImageDataURL(formControls[lastUpdatedKey].file);
          }
        }

        if (image) {
          setFormControls((prevFormControls) => ({
            ...prevFormControls,
            [lastUpdatedKey]: {
              ...prevFormControls[lastUpdatedKey],
              elementConfig: {
                ...prevFormControls[lastUpdatedKey].elementConfig,
                datasrc: image.data.link,
              },
            },
          }));

          const formData = new FormData();

          formData.append("index", lastUpdatedKey.split("-")[1]);

          formData.append("listing", router.query.id);

          formData.append("image", formControls[lastUpdatedKey].file);

          uploadImage(formData);
        }
      };

      onGetDataUri();
    }
  }, [lastUpdatedKey]);

  useEffect(() => {
    if (success) {
      setFormControls((prevFormControls) => ({
        ...prevFormControls,
        [lastUpdatedKey]: {
          ...prevFormControls[lastUpdatedKey],
          value: "",
          file: null,
          valid: false,
          touched: false,
        },
      }));

      setUploadError(false);
      setLastUpdatedKey(null);
      toast.success("Image uploaded successfully");
    }

    if (error) {
      toast.error(error);
      setUploadError(true);
    }
  }, [success, error]);

  useEffect(() => {
    if (uploadError && lastUpdatedKey) {
      setFormControls((prevFormControls) => ({
        ...prevFormControls,
        [lastUpdatedKey]: {
          ...prevFormControls[lastUpdatedKey],
          value: "",
          file: null,
          valid: false,
          touched: false,
        },
      }));

      setLastUpdatedKey(null);
    }
  }, [lastUpdatedKey, uploadError]);

  const inputChangeHandler = (event, formControlKey) => {
    const updatededFormControls = updateObject(formControls, {
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

    let formIsValid = true;

    for (let key in updatededFormControls) {
      formIsValid = updatededFormControls[key].valid && formIsValid;
    }

    setFormValidity(formIsValid);
    setLastUpdatedKey(formControlKey);
    setFormControls(updatededFormControls);
  };

  const runValidation = (image) => {
    const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (image.size > 1000000) {
      setUploadError(true);
      toast.error("File size exceeded 1MB limit");

      return false;
    }

    if (!allowedFileTypes.includes(image.type)) {
      setUploadError(true);
      toast.error(`File type: ${image.type} not supported`);

      return false;
    }

    return true;
  };

  /** Iterate over all the form elements and return it to the view */
  let formInputs = formElementsArray.map(({ id, config }) => (
    <FormInput
      key={id}
      type="listing-image"
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
      <div className={styles.title}>
        <h2>Upload Listing Images</h2>
        <p>
          Tip:{" "}
          <span>
            Your listing will be verified and approved before it can be listed.
          </span>
        </p>
      </div>
      <form
        encType="multipart/form-data"
        className={`${styles.form} ${styles.imageGrid}`}
      >
        <div className={styles.label}>
          <h3>Property Images</h3>
        </div>
        {formInputs}
      </form>
    </div>
  );
}

export default ListingUploadForm;
