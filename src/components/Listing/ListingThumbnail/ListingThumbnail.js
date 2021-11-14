import Image from "next/image";
import className from "classnames";

import styles from "src/components/Listing/Listing.module.scss";

const ListingThumbnail = ({ imageId, currentImage, setCurrentImage }) => {
  const imageSrc = `${process.env.NEXT_PUBLIC_SERVER_IMAGE_URL}/${imageId}`;

  const thumbnailBtnClass = className({
    [styles.active]: imageSrc === currentImage,
  });

  const getImageUrl = (imageId) =>
    setCurrentImage(`${process.env.NEXT_PUBLIC_SERVER_IMAGE_URL}/${imageId}`);

  return (
    <button
      className={thumbnailBtnClass}
      onClick={() => getImageUrl(imageId)}
    >
      <figure>
        <Image layout="responsive" src={imageSrc} height={150} width={200} />
      </figure>
    </button>
  );
};

export default ListingThumbnail;
