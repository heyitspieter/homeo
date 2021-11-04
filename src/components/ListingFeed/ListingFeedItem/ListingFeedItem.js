import Image from "next/image";
import { useRouter } from "next/router";
import Svg from "src/components/Svg/Svg";

import styles from "src/components/ListingFeed/ListingFeed.module.scss";

function ListingFeedItem({ imgsrc, verified }) {
  const router = useRouter();

  return (
    <div className={styles.grid__item}>
      <div
        onClick={() => router.push("/listing/AHl-212")}
        className={styles.grid__item_img}
      >
        <div className={styles.grid__item_overlay}>
          <span>Featured</span>
        </div>
        <figure>
          <Image
            src={`/images/${imgsrc}`}
            layout="responsive"
            alt="Home 1"
            height={253}
            width={400}
          />
        </figure>
      </div>
      <div className={styles.grid__item_avatar}>
        <figure>
          <Image
            src="/images/user-1.jpg"
            alt="User 1"
            width={200}
            height={200}
          />
        </figure>
      </div>
      <div className={styles.grid__item_details}>
        <h3>
          Skyper Pool Apartment
          {verified && (
            <div className={styles.grid__item_badge}>
              <Svg className={styles.iconVerified} symbol="verified" />
            </div>
          )}
        </h3>
        <p>112 Glenwood Ave Hyde Park, Boston, MA</p>
        <div className={styles.grid__item_features}>
          <div>
            <Svg className={styles.iconBed} symbol="bed" />
            <span>4 Beds</span>
          </div>
          <div>
            <Svg className={styles.iconBathtub} symbol="bathtub" />
            <span>3 Baths</span>
          </div>
          <div>
            <Svg className={styles.iconGarage} symbol="garage" />
            <span>1 Garage</span>
          </div>
          <div>
            <Svg className={styles.iconRuler} symbol="ruler" />
            <span>1200 Sq ft</span>
          </div>
        </div>
      </div>
      <div className={styles.grid__item_footer}>
        <div className={styles.grid__item_price}>
          <p>$23,000/mo</p>
        </div>
        <div className={styles.grid__item_actions}>
          <button>
            <Svg className={styles.iconPhone} symbol="phone" />
          </button>
          <button>
            <Svg className={styles.iconHeart} symbol="heart" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListingFeedItem;
