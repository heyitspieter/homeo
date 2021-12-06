import Image from "next/image";
import className from "classnames";
import { useRouter } from "next/router";
import Svg from "src/components/Svg/Svg";
import { likeListing } from "src/store/actions";
import { formatNumber, truncate } from "src/helpers";
import { useDispatch, useSelector } from "react-redux";

import styles from "src/containers/Search/SearchDesktop/SearchDesktop.module.scss";

function SearchFeedItem({ listing }) {
  const router = useRouter();

  const imageSrc = `${process.env.NEXT_PUBLIC_SERVER_IMAGE_URL}/${listing.images[0]}`;

  const dispatch = useDispatch();

  const likes = useSelector((state) => state.favorite.likes);

  const onLikeListing = (id) => dispatch(likeListing(id));

  const isLiked = likes.findIndex((like) => like.id === listing._lId) !== -1;

  const likeIconClass = className({
    [styles.iconHeart]: !isLiked,
    [styles.iconHeartFill]: isLiked,
  });

  return (
    <div className={styles.feed__grid_item}>
      <div
        onClick={() => router.push(`/listing/${listing._lId}`)}
        className={styles.feed__grid_item_img}
      >
        <div className={styles.feed__grid_item_overlay}>
          <span>{listing.status.split("-").join(" ")}</span>
          <span>{listing.distance.text}</span>
        </div>
        <figure>
          <Image
            layout="responsive"
            alt={listing.name}
            src={imageSrc}
            height={253}
            width={400}
          />
        </figure>
      </div>
      <div className={styles.feed__grid_item_avatar}>
        <figure>
          <Image
            src={
              listing.createdBy
                ? listing.createdBy.profileImage
                : "/images/avatar.jpg"
            }
            alt="Property Owner"
            height={200}
            width={200}
          />
        </figure>
      </div>
      <div className={styles.feed__grid_item_details}>
        <h3>
          {listing.name
            ? truncate(`${listing.name}`, 23)
            : truncate(listing.address, 23)}
          {listing.verified && (
            <div className={styles.feed__grid_item_badge}>
              <Svg className={styles.iconVerified} symbol="verified" />
            </div>
          )}
        </h3>
        <p>{listing.name && listing.address}</p>
        <div className={styles.feed__grid_item_features}>
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
            <span>{listing.area}</span>
          </div>
        </div>
      </div>
      <div className={styles.feed__grid_item_footer}>
        <div className={styles.feed__grid_item_price}>
          <p>₦{formatNumber(listing.price)}</p>
        </div>
        <div className={styles.feed__grid_item_actions}>
          <a href={`tel:`}>
            <Svg className={styles.iconPhone} symbol="phone" />
          </a>
          <button onClick={() => onLikeListing(listing._lId)}>
            <Svg
              className={likeIconClass}
              symbol={isLiked ? "heart-fill" : "heart"}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchFeedItem;
