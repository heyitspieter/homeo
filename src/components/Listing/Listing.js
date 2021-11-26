import Image from "next/image";
import { useRouter } from "next/router";
import Map from "src/components/Map/Map";
import Svg from "src/components/Svg/Svg";
import { formatNumber } from "src/helpers";
import { useEffect, useState } from "react";
import ListingImage from "src/components/Listing/ListingImage/ListingImage";
import ListingThumbnail from "src/components/Listing/ListingThumbnail/ListingThumbnail";

const placeholderData =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=";

const mapConfig = {
  disableDefaultUI: true,
  zoomControl: false,
};

import styles from "src/components/Listing/Listing.module.scss";

function Listing({ listing }) {
  const [currentImage, setCurrentImage] = useState(placeholderData);

  const router = useRouter();

  useEffect(() => {
    setCurrentImage(
      `${process.env.NEXT_PUBLIC_SERVER_IMAGE_URL}/${listing.images[0]}`
    );

    return () => {
      setCurrentImage("");
    };
  }, []);

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.title}>
          <div>
            <h2>{listing.name}</h2>
            {listing.verified && (
              <Svg className={styles.iconVerified} symbol="verified" />
            )}
          </div>
          <p>{listing.address}</p>
        </div>
        <div className={styles.features}>
          <div className={styles.features__item}>
            <Svg className={styles.iconBed} symbol="bed" />
            <span>{listing.beds} Beds</span>
          </div>
          <div className={styles.features__item}>
            <Svg className={styles.iconBathtub} symbol="bathtub" />
            <span>{listing.baths} Baths</span>
          </div>
          <div className={styles.features__item}>
            <Svg className={styles.iconGarage} symbol="garage" />
            <span>{listing.garages} Garage</span>
          </div>
          <div className={styles.features__item}>
            <Svg className={styles.iconRuler} symbol="ruler" />
            <span>{listing.area} Sq ft</span>
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
          <p>₦{formatNumber(listing.price)}</p>
          <span></span>
        </div>
      </div>
      <div className={styles.row}>
        <ListingImage
          imageId={listing.images[0]}
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
        />
        <div className={styles.img__thumbnail}>
          {listing.images.map((image, i) => {
            return (
              <ListingThumbnail
                key={i}
                imageId={image}
                currentImage={currentImage}
                setCurrentImage={setCurrentImage}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.row__grid}>
          <div className={styles.row__grid_item}>
            <div className={styles.description}>
              <h3>Description</h3>
              <p>{listing.description}</p>
            </div>
            <div className={styles.description__grid}>
              <h3>Location</h3>
              <div>
                <p>
                  Address: <span>{listing.location.address}</span>
                </p>
                <p>
                  City: <span>{listing.city || "Not Available"}</span>
                </p>
                <p>
                  State: <span>{listing.state || "Not Available"}</span>
                </p>
                <p>
                  Zipcode: <span>{listing.zipcode}</span>
                </p>
                <p>
                  Country: <span>{listing.country}</span>
                </p>
              </div>
            </div>
            <div className={styles.description__map}>
              <Map
                zoom={8}
                config={mapConfig}
                location={{
                  lat: listing.location.lat,
                  lng: listing.location.lng,
                }}
              />
            </div>
            <div className={styles.description__grid}>
              <h3>Property Details</h3>
              <div>
                <p>
                  Bedrooms: <span>{listing.beds}</span>
                </p>
                <p>
                  Property Type: <span>{listing.category}</span>
                </p>
                <p>
                  Price: <span>₦{formatNumber(listing.price)}</span>
                </p>
                <p>
                  Bathrooms: <span>{listing.baths}</span>
                </p>
                <p>
                  Living Rooms: <span>{listing.parlors}</span>
                </p>
                <p>
                  Property Status:{" "}
                  <span>{listing.status.split("-").join(" ")}</span>
                </p>
                <p>
                  Garage: <span>{listing.garages}</span>
                </p>
                <p>
                  Size: <span>{listing.area} Sq ft</span>
                </p>
              </div>
            </div>
            <div className={styles.description__grid}>
              <h3>Features</h3>
              <div>
                {listing.features.map((feature, i) => {
                  return (
                    <p className={styles.feature} key={i}>
                      {feature}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.row__grid_item}>
            <div className={styles.contactBox}>
              <div className={styles.contactBox__header}>
                <figure className={styles.contactBox__img}>
                  <Image
                    width={200}
                    height={200}
                    src={listing.createdBy.profileImage || "/images/avatar.jpg"}
                  />
                </figure>
                <h3>{`${listing.createdBy.firstname} ${listing.createdBy.lastname}`}</h3>
                <button>View Listings</button>
              </div>
              <div className={styles.contactBox__actions}>
                <a
                  target="__blank"
                  className={styles.action__mail}
                  href={`mailto:support@secutitexltd.com`}
                >
                  Contact Property
                </a>
                <a className={styles.action__tel} href={`tel:`}>
                  <Svg className={styles.iconWhatsapp} symbol="whatsapp" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listing;
