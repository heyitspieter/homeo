import Skeleton from "react-loading-skeleton";

import styles from "src/components/FavoritesList/FavoritesList.module.scss";

function FavoritesListSkeleton() {
  const listings = Array(3).fill("");

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
                  <Skeleton height={80} width={100} />
                </figure>
                <div>
                  <h3>
                    <Skeleton width={150} />
                  </h3>
                  <p>
                    <Skeleton width={100} />
                  </p>
                  <p>
                    <Skeleton width={120} />
                  </p>
                </div>
              </div>
              <div className={styles.item__col}>
                <button>
                  <Skeleton width={22} height={22} circle />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FavoritesListSkeleton;
