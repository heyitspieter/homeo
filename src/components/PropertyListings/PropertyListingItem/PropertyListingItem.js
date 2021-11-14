import Link from "next/link";
import Image from "next/image";
import className from "classnames";
import Svg from "src/components/Svg/Svg";
import { formatNumber, formatDate } from "src/helpers";

import styles from "src/components/PropertyListings/PropertyListings.module.scss";

function PropertyListingItem({ listing }) {
  const statusClass = (listing) =>
    className({
      [styles.green]: listing.verified,
      [styles.red]: !listing.verified,
    });

  const imageSrc = `${process.env.NEXT_PUBLIC_SERVER_IMAGE_URL}/${listing.thumbnail}`;
  
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
