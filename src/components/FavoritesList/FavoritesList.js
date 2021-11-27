import Image from "next/image";
import Svg from "src/components/Svg/Svg";
import { formatNumber } from "src/helpers";
import { useEffect, useState } from "react";
import { removeListing } from "src/store/actions";
import { usePopulateLikes } from "src/hooks/listing";
import { useDispatch, useSelector } from "react-redux";
import styles from "src/components/FavoritesList/FavoritesList.module.scss";

function FavoritesList() {
  const dispatch = useDispatch();

  const [listings, setListings] = useState([]);

  const likes = useSelector((state) => state.favorite.likes);

  const onRemoveListing = (id) => dispatch(removeListing(id));

  const [populateLikes, { data, error, loading }] = usePopulateLikes();

  useEffect(() => {
    if (likes.length > 0) {
      populateLikes(likes);
    }
  }, [likes]);

  useEffect(() => {
    if (data) {
      setListings(data);
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>My Favorites</h2>
        <p>Properties you liked will show here</p>
      </div>
      <div className={styles.list}>
        {listings.map((listing, index) => {
          return (
            <div key={index} className={styles.list__item}>
              <div className={styles.item__col}>
                <figure className={styles.item__image}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SERVER_IMAGE_URL}/${listing.images}`}
                    layout="responsive"
                    alt={listing.name}
                    height={80}
                    width={100}
                  />
                </figure>
                <div>
                  <h3>{listing.name}</h3>
                  <p>{listing.address}</p>
                  <p>₦{formatNumber(listing.price)}</p>
                </div>
              </div>
              <div className={styles.item__col}>
                <button onClick={() => onRemoveListing(listing._lId)}>
                  <Svg className={styles.iconTrash} symbol="trash" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FavoritesList;
