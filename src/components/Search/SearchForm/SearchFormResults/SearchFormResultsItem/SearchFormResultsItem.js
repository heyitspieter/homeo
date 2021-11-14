import Image from "next/image";
import { useRouter } from "next/router";
import Svg from "src/components/Svg/Svg";
import { formatNumber } from "src/helpers";

import styles from "src/components/Search/SearchForm/SearchForm.module.scss";

function SearchFormResultsItem({ listing }) {
  const router = useRouter();

  const imageSrc = `${process.env.NEXT_PUBLIC_SERVER_IMAGE_URL}/${listing.images[0]}`;

  return (
    <div
      onClick={() => router.push(`/listing/${listing._lId}`)}
      className={styles.results__list_item}
    >
      <div className={styles.item__overlay}>
        <div className={styles.overlay__row}>
          <div>
            <span>{listing.status.split("-").join(" ")}</span>
            <span>{listing.distance.text}</span>
          </div>
          <button>
            <Svg className={styles.iconHeart} symbol="heart" />
          </button>
        </div>
        <div className={styles.overlay__row}>
          <h4>{listing.name ? listing.name : listing.address}</h4>
          <p>₦{formatNumber(listing.price)}</p>
        </div>
        <div className={styles.overlay__row}>
          <div>
            <Svg className={styles.iconBed} symbol="bed" />
            <span>{listing.beds} Beds</span>
          </div>
          <div>
            <Svg className={styles.iconBathtub} symbol="bathtub" />
            <span>{listing.baths} Baths</span>
          </div>
          <div>
            <Svg className={styles.iconGarage} symbol="garage" />
            <span>{listing.garages} Garage</span>
          </div>
          <div>
            <Svg className={styles.iconRuler} symbol="ruler" />
            <span>{listing.area} Sq ft</span>
          </div>
        </div>
      </div>
      <figure className={styles.item__img}>
        <Image
          layout="responsive"
          alt={listing.name}
          src={imageSrc}
          height={210}
          width={300}
        />
      </figure>
    </div>
  );
}

export default SearchFormResultsItem;
