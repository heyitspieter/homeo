import { useRouter } from "next/router";
import { useAuth } from "src/context/AuthContext";
import styles from "src/components/HomeBanner/HomeBanner.module.scss";

function HomeBanner({ toggleAuthModal }) {
  const router = useRouter();

  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Become a Partner today!</h3>
      <p className={styles.caption}>Register as a professional</p>
      <button
        onClick={() => {
          if (isAuthenticated) {
            router.push("/account/me");
          } else {
            toggleAuthModal();
          }
        }}
        className={styles.btnCta}
      >
        Register
      </button>
    </div>
  );
}

export default HomeBanner;
