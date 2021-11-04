import Svg from "src/components/Svg/Svg";

import styles from "src/components/NewsLetter/NewsLetter.module.scss";

function NewsLetter() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h3>Sign up for newsletter</h3>
          <p>and get latest news & updates</p>
        </div>
        <form className={styles.form}>
          <div className={styles.form__group}>
            <input className={styles.form__input} type="text" placeholder="" required />
            <label className={styles.form__label}>
              Enter your email address
            </label>
            <button className={styles.btnSend}>
              <Svg className={styles.iconSend} symbol="send" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewsLetter;
