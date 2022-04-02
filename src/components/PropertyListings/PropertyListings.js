import { useGetListings } from "src/hooks/listing";
import PropertyListingSkeleton from "src/components/LoadingSkeletons/PropertyListingSkeleton";
import PropertyListingItem from "src/components/PropertyListings/PropertyListingItem/PropertyListingItem";

import styles from "src/components/PropertyListings/PropertyListings.module.scss";

const PAGE_SIZE = 6;

function PropertyListings() {
  const { data, size, error, loading, setSize } = useGetListings(PAGE_SIZE, []);

  /** PAGINATION LOGIC STARTS HERE */

  const listings = data ? [].concat(...data) : [];

  const isLoadingMore =
    loading || (size > 0 && data && typeof data[size - 1] === "undefined");

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  /** PAGINATION LOGIC ENDS HERE */

  const btnConfig = {
    onClick: (e) => {
      e.preventDefault();
      setSize(size + 1);
    },
    disabled: isLoadingMore || isReachingEnd,
  };

  if (loading || error) {
    return <PropertyListingSkeleton />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Listing Title</th>
              <th>Date Submitted</th>
              <th>Status</th>
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
      <div className={styles.loader}>
        <button {...btnConfig}>
          {isLoadingMore
            ? "Loading..."
            : isReachingEnd
            ? "End of page"
            : "Next Page"}
        </button>
      </div>
    </div>
  );
}

export default PropertyListings;
