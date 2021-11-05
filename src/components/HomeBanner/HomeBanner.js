import styles from "src/components/HomeBanner/HomeBanner.module.scss";

function HomeBanner({ toggleAuthModal }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Become a Partner today!</h3>
      <p className={styles.caption}>Register as a professional</p>
      <button onClick={toggleAuthModal} className={styles.btnCta}>
        Register
      </button>
    </div>
  );
}

export default HomeBanner;
