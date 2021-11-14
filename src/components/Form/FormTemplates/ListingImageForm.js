import Image from "next/image";

import { textError } from "styles/modules/Error.module.scss";

import styles from "src/containers/ListingForm/ListingForm.module.scss";

const placeholderData =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=";

function ListingImageForm({
  label,
  imageSrc,
  children,
  labelClasses,
  inputElement,
  parentClasses,
  validationMessage,
}) {
  let src = placeholderData;

  if (imageSrc) {
    src = imageSrc;
  }

  return (
    <div className={parentClasses.join(" ")}>
      <div className={styles.imgPlaceholder}>
        <label className={labelClasses}>{label.title}</label>
        <Image
          layout="responsive"
          alt={label.title}
          loading="lazy"
          height={295}
          width={400}
          src={src}
        />
      </div>
      <p className={textError}>{validationMessage}</p>
      {inputElement}
      {children}
    </div>
  );
}

export default ListingImageForm;
