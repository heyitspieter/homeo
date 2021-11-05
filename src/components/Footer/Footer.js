import Link from "next/link";
import className from "classnames";
import Svg from "src/components/Svg/Svg";

import styles from "src/components/Footer/Footer.module.scss";

function Footer({ tabBar }) {
  const containerClass = className({
    [styles.container]: true,
    [styles.padding__b_10]: tabBar,
  });
  
  return (
    <div className={containerClass}>
      <div className={styles.wrapper}>
        <div className={styles.contact}>
          <h3>Contact Us</h3>
          <div className={styles.contact__info}>
            <div className={styles.contact__info_item}>
              <Svg className={styles.iconMapLocation} symbol="map-location" />
              <p>15, Kayode Animashaun Str, Lekki Phase 1, Lagos, Nigeria</p>
            </div>
            <div className={styles.contact__info_item}>
              <Svg className={styles.iconPhone} symbol="phone" />
              <p>+234 (905) (535) (7134)</p>
            </div>
            <div className={styles.contact__info_item}>
              <Svg className={styles.iconMail} symbol="mail" />
              <p>support@secutitexltd.com</p>
            </div>
          </div>
        </div>
        <div className={styles.shortcuts}>
          <h3>More Links</h3>
          <div className={styles.shortcuts__links}>
            <Link href="/about-us">
              <a>About Us</a>
            </Link>
            <Link href="/terms">
              <a>Terms & Conditions</a>
            </Link>
            <Link href="/privacy-policy">
              <a>Privacy Policy</a>
            </Link>
          </div>
        </div>
        <div className={styles.newsletter}>
          <h3>
            Subscribe <span>(we will not send spam emails)</span>
          </h3>
          <form className={styles.newsletter__form}>
            <div className={styles.newsletter__form_group}>
              <input
                className={styles.newsletter__form_input}
                type="text"
                placeholder=""
                required
              />
              <label className={styles.newsletter__form_label}>
                Enter your email address
              </label>
              <button className={styles.btnSend}>
                <Svg className={styles.iconSend} symbol="send" />
              </button>
            </div>
          </form>
        </div>
        <div className={styles.copyright}>
          <p className={styles.copyright__text}>
            Copyright &copy; 2021 Secutitex. All Rights Reserved.
          </p>
          <div className={styles.copyright__logo}>
            <Link href="/">
              <a className={styles.copyright__logo_link}>
                <h2>Secutitex</h2>
              </a>
            </Link>
          </div>
          <nav className={styles.copyright__nav}>
            <Link href="/">
              <a>Home</a>
            </Link>
            <a href="#">Listing</a>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Footer;
