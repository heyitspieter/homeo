import Image from "next/image";
import styles from "src/components/Usp/Usp.module.scss";

function Usp() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Why Choose Us</h2>
        <p>We provide full service at every step</p>
      </div>
      <div className={styles.grid}>
      <div className={styles.grid__item}>
          <div className={styles.grid__item_circle}></div>
          <p>
            We engage all service workers to have professional indemnity
            insurance
          </p>
        </div>
        <div className={styles.grid__item}>
          <div className={styles.grid__item_circle}></div>
          <p>
            Trusted by thousands. We are a business built on integrity, honesty
            and trust.
          </p>
        </div>
        <div className={styles.grid__item}>
          <div className={styles.grid__item_circle}></div>
          <p>
            We have experienced management staff who have worked in management
            for FTSE 250 firms
          </p>
        </div>
        <div className={styles.grid__item}>
          <div className={styles.grid__item_circle}></div>
          <p>
            We encourage international best practice training of trade services
            through our plaform
          </p>
        </div>
      </div>
    </div>
  );
}

export default Usp;
