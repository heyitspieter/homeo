import Image from "next/image";
import { useEffect } from "react";
import className from "classnames";
import { useGetImage } from "src/hooks/listing";

import styles from "src/components/Listing/Listing.module.scss";

const placeholderData =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=";

const ListingThumbnail = ({ imageId, currentImage, setCurrentImage }) => {
  let imageSrc = placeholderData;

  const [getImage, { data: image }] = useGetImage();

  useEffect(() => {
    getImage(imageId);
  }, []);

  if (image) {
    imageSrc = image;
  }

  const thumbnailBtnClass = className({
    [styles.active]: image === currentImage,
  });

  return (
    <button
      className={thumbnailBtnClass}
      onClick={() => setCurrentImage(imageSrc)}
    >
      <figure>
        <Image layout="responsive" src={imageSrc} height={150} width={200} />
      </figure>
    </button>
  );
};

export default ListingThumbnail;
