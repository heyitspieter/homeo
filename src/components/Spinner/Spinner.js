import styles from "src/components/Spinner/Spinner.module.scss";

const Spinner = ({ loading }) =>
  loading ? <div className={styles.mini}></div> : null;

export default Spinner;
