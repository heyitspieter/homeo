import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Svg from "src/components/Svg/Svg";
import { useGetImage } from "src/hooks/listing";
import { formatNumber, truncate } from "src/helpers";

import styles from "src/components/Search/SearchFeed/SearchFeed.module.scss";

const placeholderData =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=";

function SearchFeedItem({ listing }) {
  const router = useRouter();

  const [getImage, { data: image }] = useGetImage();

  useEffect(() => {
    getImage(listing.images[0]);
  }, []);

  let imageSrc = placeholderData;

  if (image) {
    imageSrc = image;
  }

  return (
    <div className={styles.grid__item}>
      <div
        onClick={() => router.push(`/listing/${listing._lId}`)}
        className={styles.grid__item_img}
      >
        <div className={styles.grid__item_overlay}>
          <span>{listing.status.split("-").join(" ")}</span>
          <span>{listing.distance.text}</span>
        </div>
        <figure>
          <Image
            src={imageSrc}
            layout="responsive"
            alt={listing.name}
            height={253}
            width={400}
          />
        </figure>
      </div>
      <div className={styles.grid__item_avatar}>
        <figure>
          <Image
            src={listing.createdBy.profileImage || "/images/avatar.jpg"}
            alt="Property Owner"
            height={200}
            width={200}
          />
        </figure>
      </div>
      <div className={styles.grid__item_details}>
        <h3>
          {listing.name
            ? truncate(`${listing.name}`, 23)
            : truncate(listing.address, 23)}
          <div className={styles.grid__item_badge}>
            <Svg className={styles.iconVerified} symbol="verified" />
          </div>
        </h3>
        <p>{listing.name && listing.address}</p>
        <div className={styles.grid__item_features}>
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
            <span>{listing.garages} Garages</span>
          </div>
          <div>
            <Svg className={styles.iconRuler} symbol="ruler" />
            <span>{listing.area} Sq ft</span>
          </div>
        </div>
      </div>
      <div className={styles.grid__item_footer}>
        <div className={styles.grid__item_price}>
          <p>₦{formatNumber(listing.price)}</p>
        </div>
        <div className={styles.grid__item_actions}>
          <a href={`tel:${listing.createdBy.mobileNumber}`}>
            <Svg className={styles.iconPhone} symbol="phone" />
          </a>
          <button>
            <Svg className={styles.iconHeart} symbol="heart" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchFeedItem;
