import Image from "next/image";

import styles from "src/components/Listing/Listing.module.scss";

function ListingImage({ currentImage }) {
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
