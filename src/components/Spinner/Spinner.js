import styles from "src/components/Spinner/Spinner.module.scss";

const Spinner = ({ text, mini, loading }) => {
  if (mini && loading) {
    return <div className={styles.mini}></div>;
  }

  return (
    <>
      {loading ? (
        <div className={styles.overlay}>
          <p>{text}</p>
          <div className={styles.backdrop}></div>
          <div className={styles.spinner}></div>
        </div>
      ) : null}
      <style jsx global>
        {`
          body {
            overflow: ${loading ? `hidden` : `auto`}!important;
          }
        `}
      </style>
    </>
  );
};

export default Spinner;
