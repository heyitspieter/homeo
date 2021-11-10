import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import className from "classnames";
import Svg from "src/components/Svg/Svg";
import { useGetImage } from "src/hooks/listing";
import { formatNumber, formatDate } from "src/helpers";

import styles from "src/components/PropertyListings/PropertyListings.module.scss";

const placeholderData =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=";

function PropertyListingItem({ listing }) {
  const [getImage, { data: image, loading }] = useGetImage();

  useEffect(() => {
    getImage(listing.thumbnail);
  }, []);

  const statusClass = (listing) =>
    className({
      [styles.green]: listing.verified,
      [styles.red]: !listing.verified,
    });

  let imageSrc = placeholderData;

  if (image) {
    imageSrc = image;
  }

  return (
    <tr>
      <td>
        <div className={styles.list__item}>
          <figure className={styles.list__image}>
            <Image
              layout="responsive"
              alt={listing.name}
              src={imageSrc}
              height={80}
              width={100}
            />
          </figure>
          <div>
            <h3>
              <Link href={`/listing/${listing._lId}`}>
                <a>{listing.name}</a>
              </Link>
            </h3>
            <p>{listing.address}</p>
            <p>₦{formatNumber(listing.price)}</p>
          </div>
        </div>
      </td>
      <td>{formatDate(listing.createdAt)}</td>
      <td>
        <p className={statusClass(listing)}>
          {listing.verified ? "Verified" : "Pending"}
        </p>
      </td>
      <td>0</td>
      <td>
        <div className={styles.action}>
          <button disabled={listing.verified}>
            <Svg className={styles.iconEdit} symbol="edit-circle" />
          </button>
          <button disabled={listing.verified}>
            <Svg className={styles.iconTrash} symbol="trash" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default PropertyListingItem;
