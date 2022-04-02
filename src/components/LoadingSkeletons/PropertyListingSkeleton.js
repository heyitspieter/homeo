import Skeleton from "react-loading-skeleton";

import styles from "src/components/PropertyListings/PropertyListings.module.scss";

function PropertyListingSkeleton() {
  const listings = Array(3).fill("");

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Listing Title</th>
              <th>Date Submitted</th>
              <th>Status</th>
              <th>Views</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing, index) => {
              return (
                <tr>
                  <td>
                    <div className={styles.list__item}>
                      <figure className={styles.list__image}>
                        <Skeleton height={80} width={100} />
                      </figure>
                      <div>
                        <h3>
                          <Skeleton width={80} />
                        </h3>
                        <p>
                          <Skeleton width={150} />
                        </p>
                        <p>
                          <Skeleton width={100} />
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Skeleton width={80} />
                  </td>
                  <td>
                    <p>
                      <Skeleton width={80} />
                    </p>
                  </td>
                  <td>
                    <div className={styles.action}>
                      <button>
                        <Skeleton width={22} height={22} circle />
                      </button>
                      <button>
                        <Skeleton width={22} height={22} circle />
                      </button>
                      <button disabled={listing.verified}>
                        <Skeleton width={22} height={22} circle />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PropertyListingSkeleton;
