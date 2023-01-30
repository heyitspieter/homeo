import Image from "next/image";
import Svg from "src/components/Svg/Svg";

// import ListingFeedItem from "src/components/ListingFeed/ListingFeedItem/ListingFeedItem";

import styles from "src/components/ListingFeed/ListingFeed.module.scss";

function ListingFeed({ listings }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h2>Discover Our Featured Listings</h2>
          <p>Top Listings Picked for you</p>
        </div>
        <div className={styles.grid}>
          <div className={styles.grid__item}>
            <div className={styles.grid__item_img}>
              <div className={styles.grid__item_overlay}>
                <span>Featured</span>
              </div>
              <figure>
                <Image
                  src={"/images/home-5.jpg"}
                  layout="responsive"
                  alt="La vida"
                  height={253}
                  width={400}
                />
              </figure>
            </div>
            <div className={styles.grid__item_avatar}>
              <figure>
                <Image
                  src={"/images/badge_2.jpg"}
                  alt="User 1"
                  width={200}
                  height={200}
                />
              </figure>
            </div>
            <div className={styles.grid__item_details}>
              <h3>
                The Blue Sky Home
                <div className={styles.grid__item_badge}>
                  <Image
                    src="/images/badge.png"
                    alt="badge"
                    height={20}
                    width={20}
                  />
                </div>
              </h3>
              <p>203 Fake St. Mountain View, San Francisco, California, USA</p>
              <div className={styles.grid__item_features}>
                <div>
                  <Svg className={styles.iconBed} symbol="bed" />
                  <span>3 Beds</span>
                </div>
                <div>
                  <Svg className={styles.iconBathtub} symbol="bathtub" />
                  <span>2 Baths</span>
                </div>
                <div>
                  <Svg className={styles.iconGarage} symbol="garage" />
                  <span>2 Garage</span>
                </div>
                <div>
                  <Svg className={styles.iconRuler} symbol="ruler" />
                  <span>1,878 sqft</span>
                </div>
              </div>
            </div>
            <div className={styles.grid__item_footer}>
              <div className={styles.grid__item_price}>
                <p>$800,000</p>
              </div>
              <div className={styles.grid__item_actions}>
                <a href={`tel:`}>
                  <Svg className={styles.iconPhone} symbol="phone" />
                </a>
                <button>
                  <Svg className={styles.iconHeart} symbol="heart" />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.grid__item}>
            <div className={styles.grid__item_img}>
              <div className={styles.grid__item_overlay}>
                <span>Featured</span>
              </div>
              <figure>
                <Image
                  src={"/images/home-1.jpg"}
                  layout="responsive"
                  alt="La vida"
                  height={253}
                  width={400}
                />
              </figure>
            </div>
            <div className={styles.grid__item_avatar}>
              <figure>
                <Image
                  src={"/images/badge_2.jpg"}
                  alt="User 1"
                  width={200}
                  height={200}
                />
              </figure>
            </div>
            <div className={styles.grid__item_details}>
              <h3>
                The Blue Sky Home
                <div className={styles.grid__item_badge}>
                  <Image
                    src="/images/badge.png"
                    alt="badge"
                    height={20}
                    width={20}
                  />
                </div>
              </h3>
              <p>203 Fake St. Mountain View, San Francisco, California, USA</p>
              <div className={styles.grid__item_features}>
                <div>
                  <Svg className={styles.iconBed} symbol="bed" />
                  <span>3 Beds</span>
                </div>
                <div>
                  <Svg className={styles.iconBathtub} symbol="bathtub" />
                  <span>2 Baths</span>
                </div>
                <div>
                  <Svg className={styles.iconGarage} symbol="garage" />
                  <span>2 Garage</span>
                </div>
                <div>
                  <Svg className={styles.iconRuler} symbol="ruler" />
                  <span>1,878 sqft</span>
                </div>
              </div>
            </div>
            <div className={styles.grid__item_footer}>
              <div className={styles.grid__item_price}>
                <p>$800,000</p>
              </div>
              <div className={styles.grid__item_actions}>
                <a href={`tel:`}>
                  <Svg className={styles.iconPhone} symbol="phone" />
                </a>
                <button>
                  <Svg className={styles.iconHeart} symbol="heart" />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.grid__item}>
            <div className={styles.grid__item_img}>
              <div className={styles.grid__item_overlay}>
                <span>Featured</span>
              </div>
              <figure>
                <Image
                  src={"/images/home-3.jpg"}
                  layout="responsive"
                  alt="La vida"
                  height={253}
                  width={400}
                />
              </figure>
            </div>
            <div className={styles.grid__item_avatar}>
              <figure>
                <Image
                  src={"/images/badge_2.jpg"}
                  alt="User 1"
                  width={200}
                  height={200}
                />
              </figure>
            </div>
            <div className={styles.grid__item_details}>
              <h3>
                The Blue Sky Home
                <div className={styles.grid__item_badge}>
                  <Image
                    src="/images/badge.png"
                    alt="badge"
                    height={20}
                    width={20}
                  />
                </div>
              </h3>
              <p>203 Fake St. Mountain View, San Francisco, California, USA</p>
              <div className={styles.grid__item_features}>
                <div>
                  <Svg className={styles.iconBed} symbol="bed" />
                  <span>3 Beds</span>
                </div>
                <div>
                  <Svg className={styles.iconBathtub} symbol="bathtub" />
                  <span>2 Baths</span>
                </div>
                <div>
                  <Svg className={styles.iconGarage} symbol="garage" />
                  <span>2 Garage</span>
                </div>
                <div>
                  <Svg className={styles.iconRuler} symbol="ruler" />
                  <span>1,878 sqft</span>
                </div>
              </div>
            </div>
            <div className={styles.grid__item_footer}>
              <div className={styles.grid__item_price}>
                <p>$800,000</p>
              </div>
              <div className={styles.grid__item_actions}>
                <a href={`tel:`}>
                  <Svg className={styles.iconPhone} symbol="phone" />
                </a>
                <button>
                  <Svg className={styles.iconHeart} symbol="heart" />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.grid__item}>
            <div className={styles.grid__item_img}>
              <div className={styles.grid__item_overlay}>
                <span>Featured</span>
              </div>
              <figure>
                <Image
                  src={"/images/home-4.jpg"}
                  layout="responsive"
                  alt="La vida"
                  height={253}
                  width={400}
                />
              </figure>
            </div>
            <div className={styles.grid__item_avatar}>
              <figure>
                <Image
                  src={"/images/badge_2.jpg"}
                  alt="User 1"
                  width={200}
                  height={200}
                />
              </figure>
            </div>
            <div className={styles.grid__item_details}>
              <h3>
                The Blue Sky Home
                <div className={styles.grid__item_badge}>
                  <Image
                    src="/images/badge.png"
                    alt="badge"
                    height={20}
                    width={20}
                  />
                </div>
              </h3>
              <p>203 Fake St. Mountain View, San Francisco, California, USA</p>
              <div className={styles.grid__item_features}>
                <div>
                  <Svg className={styles.iconBed} symbol="bed" />
                  <span>3 Beds</span>
                </div>
                <div>
                  <Svg className={styles.iconBathtub} symbol="bathtub" />
                  <span>2 Baths</span>
                </div>
                <div>
                  <Svg className={styles.iconGarage} symbol="garage" />
                  <span>2 Garage</span>
                </div>
                <div>
                  <Svg className={styles.iconRuler} symbol="ruler" />
                  <span>1,878 sqft</span>
                </div>
              </div>
            </div>
            <div className={styles.grid__item_footer}>
              <div className={styles.grid__item_price}>
                <p>$800,000</p>
              </div>
              <div className={styles.grid__item_actions}>
                <a href={`tel:`}>
                  <Svg className={styles.iconPhone} symbol="phone" />
                </a>
                <button>
                  <Svg className={styles.iconHeart} symbol="heart" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingFeed;
