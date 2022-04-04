import Image from "next/image";
import className from "classnames";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Map from "src/components/Map/Map";
import Svg from "src/components/Svg/Svg";
import { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import { likeListing } from "src/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { formatNumber, copyToClipboard } from "src/helpers";
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
    if (listing) {
      setCurrentImage(
        `${process.env.NEXT_PUBLIC_SERVER_IMAGE_URL}/${listing.images[0]}`
      );
    }

    return () => {
      setCurrentImage("");
    };
  }, []);

  const shareListing = () => {
    copyToClipboard(
      `${process.env.NEXT_PUBLIC_BASE_URL}/listing/${listing._lId}`
    );
    toast.success("Link copied to clipboard");
  };

  const dispatch = useDispatch();

  const likes = useSelector((state) => state.favorite.likes);

  const onLikeListing = (id) => dispatch(likeListing(id));

  const isLiked = likes.findIndex((like) => like.id === listing._lId) !== -1;

  const likeIconClass = className({
    [styles.iconHeart]: !isLiked,
    [styles.iconHeartFill]: isLiked,
  });

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.title}>
          <div>
            <h2>{listing.name ? listing.name : "Secutitex Property"}</h2>
            {listing.verified && (
              <Image
                src="/images/badge.png"
                alt="badge"
                height={25}
                width={25}
              />
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
            <span>{listing.area}</span>
          </div>
        </div>
        <div className={styles.util}>
          <button onClick={shareListing}>
            <Svg className={styles.iconShare} symbol="share" />
            <span>Share</span>
          </button>
          <button onClick={() => onLikeListing(listing._lId)}>
            <Svg
              className={likeIconClass}
              symbol={isLiked ? "heart-fill" : "heart"}
            />
            <span>Like</span>
          </button>
        </div>
        <div className={styles.price}>
          <p>₦{formatNumber(listing.price)}</p>
          <span>
            {listing.bargain === "yes" ? "Negotiable" : "Non-Negotiable"}
          </span>
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
              <div
                className={styles.description__content}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(listing.description),
                }}
              ></div>
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
                  Size: <span>{listing.area}</span>
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
                    src={
                      listing.createdBy
                        ? listing.createdBy.profileImage
                        : "/images/logo.png"
                    }
                  />
                </figure>
                <div>
                  <h3>
                    {listing.createdBy
                      ? `${listing.createdBy.firstname} ${listing.createdBy.lastname}`
                      : "Secutitex"}
                  </h3>
                  {listing.createdBy ? (
                    <button>{listing.createdBy.profession.name}</button>
                  ) : null}
                </div>
              </div>
              <div className={styles.contactBox__actions}>
                <a
                  target="__blank"
                  className={styles.action__mail}
                  href={`mailto:support@secutitexltd.com`}
                >
                  Get in Touch
                </a>
                <a className={styles.action__tel} href={`tel:2348125255604`}>
                  <Svg className={styles.iconWhatsapp} symbol="phone" />
                  <span>Call</span>
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
