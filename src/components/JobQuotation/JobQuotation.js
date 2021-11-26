import Image from "next/image";
import styles from "src/components/JobQuotation/JobQuotation.module.scss";

function JobQuotation({ launchFinder }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Do you need a trades person?</h3>
      <p className={styles.caption}>Find the right professional for the job.</p>
      <button onClick={() => launchFinder()} className={styles.btnCta}>
        Get Started
      </button>
    </div>
  );
}

export default JobQuotation;
