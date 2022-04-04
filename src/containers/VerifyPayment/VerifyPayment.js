import className from "classnames";
import Svg from "src/components/Svg/Svg";
import { useEffect, useState } from "react";
import Spinner from "src/components/Spinner/Spinner";
import { useVerifyTransaction } from "src/hooks/payment";

import styles from "src/containers/VerifyPayment/VerifyPayment.module.scss";

function VerifyPayment() {
  const [isLoading, setIsLoading] = useState(true);

  const [verifyTransaction, { data: success, error }] = useVerifyTransaction();

  useEffect(() => {
    if (success || error) {
      setIsLoading(false);
    }
  }, [success, error]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    const transaction = {};

    for (let param of query.entries()) {
      transaction[param[0]] = param[1];
    }

    verifyTransaction(JSON.stringify(transaction));
  }, []);

  const circleClass = className({
    [styles.circle]: true,
    [styles.error]: error,
    [styles.success]: success,
  });

  return (
    <div className={styles.container}>
      {isLoading && (
        <div className={styles.loaderWrapper}>
          <Spinner mini loading />
        </div>
      )}
      {(success || error) && (
        <div className={styles.dialogContainer}>
          <div className={circleClass}>
            <div>
              <Svg symbol={success ? "double-check" : "exclamate"} />
            </div>
          </div>
          <div className={styles.info}>
            <h2>{error ? "An error occured" : "Thank you for your payment"}</h2>
            <p>
              {error
                ? "We're unable to verify this transaction at this time"
                : "We've successfully verified this transaction"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyPayment;
