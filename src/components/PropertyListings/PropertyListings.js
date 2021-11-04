import Image from "next/image";
import styles from "src/components/PropertyListings/PropertyListings.module.scss";

function PropertyListings() {
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
        <div className={styles.filter__col}>
          <div className={styles.filter__item}>
            <input type="text" placeholder="Search by Listing Id" required />
          </div>
        </div>
      </div>
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Listing Title</th>
              <th>Date Verified</th>
              <th>Status</th>
              <th>Views</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className={styles.list__item}>
                  <figure className={styles.list__image}>
                    <Image
                      src="/images/home-1.jpg"
                      layout="responsive"
                      alt="Home 1"
                      height={80}
                      width={100}
                    />
                  </figure>
                  <div>
                    <h3>New Apartment Nice View</h3>
                    <p>Quincy St, Brooklyn, NY, USA</p>
                    <p>$2,500/mo</p>
                  </div>
                </div>
              </td>
              <td>30th December 2021</td>
              <td>Pending</td>
              <td>100</td>
              <td></td>
            </tr>
            <tr>
              <td>
                <div className={styles.list__item}>
                  <figure className={styles.list__image}>
                    <Image
                      src="/images/home-2.jpg"
                      layout="responsive"
                      alt="Home 1"
                      height={80}
                      width={100}
                    />
                  </figure>
                  <div>
                    <h3>New Apartment Nice View</h3>
                    <p>Quincy St, Brooklyn, NY, USA</p>
                    <p>$3,700/mo</p>
                  </div>
                </div>
              </td>
              <td>30th December 2021</td>
              <td>Pending</td>
              <td>100</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PropertyListings;
