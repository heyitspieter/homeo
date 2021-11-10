import Image from "next/image";
import { useEffect } from "react";
import { useGetImage } from "src/hooks/listing";

import styles from "src/components/Listing/Listing.module.scss";

function ListingImage({ imageId, currentImage, setCurrentImage }) {
  const [getImage, { data: image }] = useGetImage();

  useEffect(() => {
    getImage(imageId);
  }, []);

  useEffect(() => {
    if (image) {
      setCurrentImage(image);
    }
  }, [image]);

  return (
    <div className={styles.img}>
      <figure>
        <Image
          width={500}
          height={295}
          src={currentImage}
          layout="responsive"
        />
      </figure>
    </div>
  );
}

export default ListingImage;
