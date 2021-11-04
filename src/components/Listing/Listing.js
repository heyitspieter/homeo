import Image from "next/image";
import Svg from "src/components/Svg/Svg";

import styles from "src/components/Listing/Listing.module.scss";

function Listing() {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.title}>
          <h2 className={styles.title}>Luxury Family Loft by Victory Park</h2>
          <p>Quincy St, Brooklyn, NY, USA</p>
        </div>
        <div className={styles.features}>
          <div className={styles.features__item}>
            <Svg className={styles.iconBed} symbol="bed" />
            <span>4 Beds</span>
          </div>
          <div className={styles.features__item}>
            <Svg className={styles.iconBathtub} symbol="bathtub" />
            <span>5 Baths</span>
          </div>
          <div className={styles.features__item}>
            <Svg className={styles.iconGarage} symbol="garage" />
            <span>1 Garage</span>
          </div>
          <div className={styles.features__item}>
            <Svg className={styles.iconRuler} symbol="ruler" />
            <span>1200 Sq ft</span>
          </div>
          <div className={styles.features__item}>
            <Svg className={styles.iconCalendar} symbol="calendar" />
            <span>Year Built: 2012</span>
          </div>
        </div>
        <div className={styles.util}>
          <button>
            <Svg className={styles.iconShare} symbol="share" />
            <span>Share</span>
          </button>
          <button>
            <Svg className={styles.iconHeart} symbol="heart" />
            <span>Save</span>
          </button>
        </div>
        <div className={styles.price}>
          <p>$7,200/mo</p>
          <span>Est. Mortgage</span>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.img}>
          <figure>
            <Image
              src="/images/home-1.jpg"
              layout="responsive"
              height={295}
              width={500}
            />
          </figure>
        </div>
        <div className={styles.img__thumbnail}>
          <figure>
            <Image
              src="/images/home-2.jpg"
              layout="responsive"
              height={150}
              width={200}
            />
          </figure>
          <figure>
            <Image
              src="/images/home-3.jpg"
              layout="responsive"
              height={150}
              width={200}
            />
          </figure>
          <figure>
            <Image
              src="/images/home-4.jpg"
              layout="responsive"
              height={150}
              width={200}
            />
          </figure>
          <figure>
            <Image
              src="/images/house.jpg"
              layout="responsive"
              height={150}
              width={200}
            />
          </figure>
          <figure>
            <Image
              src="/images/apartment.jpg"
              layout="responsive"
              height={150}
              width={200}
            />
          </figure>
          <figure>
            <Image
              src="/images/office.jpg"
              layout="responsive"
              height={150}
              width={200}
            />
          </figure>
          <figure>
            <Image
              src="/images/home-1.jpg"
              layout="responsive"
              height={150}
              width={200}
            />
          </figure>
          <figure>
            <Image
              src="/images/home-2.jpg"
              layout="responsive"
              height={150}
              width={200}
            />
          </figure>
          <figure>
            <Image
              src="/images/home-3.jpg"
              layout="responsive"
              height={150}
              width={200}
            />
          </figure>
          <figure>
            <Image
              src="/images/home-4.jpg"
              layout="responsive"
              height={150}
              width={200}
            />
          </figure>
          <figure>
            <Image
              src="/images/office.jpg"
              layout="responsive"
              height={150}
              width={200}
            />
          </figure>
          <figure>
            <Image
              src="/images/apartment.jpg"
              layout="responsive"
              height={150}
              width={200}
            />
          </figure>
          <figure>
            <Image
              src="/images/room.jpg"
              layout="responsive"
              height={150}
              width={200}
            />
          </figure>
          <figure>
            <Image
              src="/images/office.jpg"
              layout="responsive"
              height={150}
              width={200}
            />
          </figure>
          <figure>
            <Image
              src="/images/villa.jpg"
              layout="responsive"
              height={150}
              width={200}
            />
          </figure>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.row__grid}>
          <div className={styles.row__grid_item}>
            <div className={styles.description}>
              <h3>Description</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at
                tempor arcu. Cras in lobortis lectus. Vestibulum in elit
                consectetur dolor ornare finibus ac at augue. Aenean eleifend
                enim nulla, facilisis dapibus lacus iaculis a. Suspendisse sed
                ex nisi. Aenean sed nisl mauris. Vivamus vitae sem at lacus
                tempor posuere. Aenean malesuada nibh nec lacus pellentesque,
                vel luctus diam commodo. Suspendisse libero lectus, tempus ac
                ultricies ac, cursus in erat. Quisque vel nisl nec odio sodales
                hendrerit ac eget quam. Aenean leo erat, sollicitudin ut
                tristique at, elementum blandit nisl.
              </p>
              <p>
                Phasellus tempor tellus nec lorem tristique, id dapibus tellus
                condimentum. Pellentesque pharetra dolor mi, quis sagittis nisl
                accumsan non. Nulla pharetra vehicula ex, non pharetra nisi
                suscipit et.
              </p>
            </div>
            <div className={styles.description__grid}>
              <h3>Location</h3>
              <p>
                Address: <span>329 Queens bury street</span>
              </p>
              <p>
                City: <span>Jersey Street</span>
              </p>
              <p>
                State: <span>New Jersey State</span>
              </p>
              <p>
                Zipcode: <span>901101</span>
              </p>
              <p>
                Country: <span>United States</span>
              </p>
            </div>
            <div className={styles.description__map}>Map</div>
            <div className={styles.description__grid}>
              <h3>Property Details</h3>
              <p>
                Property ID: <span>AJL-0129</span>
              </p>
              <p>
                Bedrooms: <span>8</span>
              </p>
              <p>
                Property Type: <span>Apartment</span>
              </p>
              <p>
                Price: <span>$7,200</span>
              </p>
              <p>
                Bathrooms: <span>5</span>
              </p>
              <p>
                Property Status: <span>For Sale</span>
              </p>
              <p>
                Garage: <span>2</span>
              </p>
              <p>
                Size: <span>1560 Sq ft</span>
              </p>
              <p>
                Year Built: <span>2012</span>
              </p>
            </div>
          </div>
          <div className={styles.row__grid_item}>
            <div className={styles.contactBox}>
              <div className={styles.contactBox__header}>
                <figure className={styles.contactBox__img}>
                  <Image src="/images/user-1.jpg" width={200} height={200} />
                </figure>
                <h3>Darell Williams</h3>
                <button>View Listings</button>
              </div>
              <div className={styles.contactBox__actions}>
                <button>Contact Property</button>
                <button>
                  <Svg className={styles.iconWhatsapp} symbol="whatsapp" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listing;
