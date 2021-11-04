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
          <h3>Trusted By Thousands</h3>
          <p>A business based on integrity, honesty and trust. </p>
        </div>
        <div className={styles.grid__item}>
          <div className={styles.grid__item_circle}></div>
          <h3>Trusted By Thousands</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            pellentesque vulputate tortor at accumsan. Duis at fringilla eros.{" "}
          </p>
        </div>
        <div className={styles.grid__item}>
          <div className={styles.grid__item_circle}></div>
          <h3>Trusted By Thousands</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            pellentesque vulputate tortor at accumsan. Duis at fringilla eros.{" "}
          </p>
        </div>
        <div className={styles.grid__item}>
          <div className={styles.grid__item_circle}></div>
          <h3>Trusted By Thousands</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            pellentesque vulputate tortor at accumsan. Duis at fringilla eros.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Usp;
