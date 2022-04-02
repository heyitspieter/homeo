import Image from "next/image";
import className from "classnames";
import { useRouter } from "next/router";
import Svg from "src/components/Svg/Svg";
import { likeListing } from "src/store/actions";
import { truncate, formatNumber } from "src/helpers";
import { useDispatch, useSelector } from "react-redux";

import styles from "src/components/ListingFeed/ListingFeed.module.scss";

function ListingFeedItem({ listing }) {
  const router = useRouter();

  const dispatch = useDispatch();

  const likes = useSelector((state) => state.favorite.likes);

  const onLikeListing = (id) => dispatch(likeListing(id));

  const isLiked = likes.findIndex((like) => like.id === listing._lId) !== -1;

  const likeIconClass = className({
    [styles.iconHeart]: !isLiked,
    [styles.iconHeartFill]: isLiked,
  });

  return (
    <div className={styles.grid__item}>
      <div
        className={styles.grid__item_img}
        onClick={() => router.push(`/listing/${listing._lId}`)}
      >
        <div className={styles.grid__item_overlay}>
          <span>Featured</span>
        </div>
        <figure>
          <Image
            src={`${process.env.NEXT_PUBLIC_SERVER_IMAGE_URL}/${listing.thumbnail}`}
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
            src={
              listing.userdata[0]
                ? listing.userdata[0].profileImage
                : "/images/logo.png"
            }
            alt="User 1"
            width={200}
            height={200}
          />
        </figure>
      </div>
      <div className={styles.grid__item_details}>
        <h3>
          {listing.name
            ? truncate(`${listing.name}`, 23)
            : truncate(listing.address, 23)}
          {listing.verified && (
            <div className={styles.grid__item_badge}>
              <Image
                src="/images/badge.png"
                alt="badge"
                height={20}
                width={20}
              />
            </div>
          )}
        </h3>
        {listing.name ? <p>{listing.address}</p> : <p>&nbsp;</p>}
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
            <span>{listing.garages} Garage</span>
          </div>
          <div>
            <Svg className={styles.iconRuler} symbol="ruler" />
            <span>{listing.area}</span>
          </div>
        </div>
      </div>
      <div className={styles.grid__item_footer}>
        <div className={styles.grid__item_price}>
          <p>₦{formatNumber(listing.price)}</p>
        </div>
        <div className={styles.grid__item_actions}>
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

export default ListingFeedItem;
