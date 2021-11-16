import { useGetListings } from "src/hooks/listing";
import PropertyListingItem from "src/components/PropertyListings/PropertyListingItem/PropertyListingItem";

import styles from "src/components/PropertyListings/PropertyListings.module.scss";

function PropertyListings() {
  const { data: listings, error, loading } = useGetListings();

  if (loading || error) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <div className={styles.filter__col}>
          <div className={styles.filter__item}>
            <span>Filter by Status:</span>
            <select>
              <option value="all">All</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
        <div className={styles.filter__col}></div>
      </div>
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
              return <PropertyListingItem key={index} listing={listing} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PropertyListings;
