import * as gtag from "src/libs/gtag";
import styles from "src/components/JobQuotation/JobQuotation.module.scss";

function JobQuotation({ launchFinder }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Need a trades person today?</h3>
      <p className={styles.caption}>Find the right professional for the job.</p>
      <button
        onClick={() => {
          launchFinder();
          gtag.event({
            label: "Finder",
            category: "Finder",
            action: "Launch Finder",
            value: "Find the right professional",
          });
        }}
        className={styles.btnCta}
      >
        Get Started
      </button>
    </div>
  );
}

export default JobQuotation;
