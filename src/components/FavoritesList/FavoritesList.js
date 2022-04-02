import Link from "next/link";
import Image from "next/image";
import Svg from "src/components/Svg/Svg";
import { formatNumber } from "src/helpers";
import { useEffect, useState } from "react";
import { removeListing } from "src/store/actions";
import { usePopulateLikes } from "src/hooks/listing";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import Animated from "src/components/Animated/Animated";
import FavoritesListSkeleton from "src/components/LoadingSkeletons/FavoritesListSkeleton";

import styles from "src/components/FavoritesList/FavoritesList.module.scss";

const animConfig = {
  timeout: 500,
  classNames: "fade",
};

function FavoritesList() {
  let nodeRefs = [];

  const dispatch = useDispatch();

  const [listings, setListings] = useState([]);

  const likes = useSelector((state) => state.favorite.likes);

  const onRemoveListing = (id) => dispatch(removeListing(id));

  const [populateLikes, { data, error, loading }] = usePopulateLikes();

  const setNodeRefs = (ref) => {
    nodeRefs.push(ref);
  };

  useEffect(() => {
    populateLikes(likes);
  }, [likes.length]);

  useEffect(() => {
    if (data) {
      setListings(data);
    }
  }, [data]);

  if (loading || error) {
    return <FavoritesListSkeleton />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>My Favorites</h2>
        <p>Properties you liked will show here</p>
      </div>
      <div className={styles.list}>
        <Animated type="group">
          {listings.map((listing, i) => {
            return (
              <CSSTransition key={i} {...animConfig} nodeRef={setNodeRefs[i]}>
                <div ref={setNodeRefs[i]} className={styles.list__item}>
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
                      <h3>
                        <Link href={`/listing/${listing._lId}`}>
                          <a>
                            {listing.name ? listing.name : "Secutitex Property"}
                          </a>
                        </Link>
                      </h3>
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
              </CSSTransition>
            );
          })}
        </Animated>
      </div>
    </div>
  );
}

export default FavoritesList;
