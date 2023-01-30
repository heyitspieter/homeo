import Link from "next/link";
import Script from "next/script";
import className from "classnames";
import Svg from "src/components/Svg/Svg";
import NewsLetter from "src/containers/NewsLetter/NewsLetter";

import styles from "src/components/Footer/Footer.module.scss";

function Footer({ tabBar }) {
  const containerClass = className({
    [styles.container]: true,
    [styles.padding__b_10]: tabBar,
  });

  return (
    <>
      <div className={containerClass}>
        <div className={styles.wrapper}>
          <div className={styles.contact}>
            <h3>Contact Us</h3>
            <div className={styles.contact__info}>
              <div className={styles.contact__info_item}>
                <Svg className={styles.iconMapLocation} symbol="map-location" />
                <p>15, lorem ipsum sal que astra jun que</p>
              </div>
              <div className={styles.contact__info_item}>
                <Svg className={styles.iconPhone} symbol="phone" />
                <p>+234 (567) (890) (1243)</p>
              </div>
              <div className={styles.contact__info_item}>
                <Svg className={styles.iconMail} symbol="mail" />
                <p>mailto:example@example.com</p>
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
          <NewsLetter />
          <div className={styles.copyright}>
            <p className={styles.copyright__text}>
              Copyright &copy; 2021 Homeo. All Rights Reserved.
            </p>
            <div className={styles.copyright__logo}>
              <Link href="/">
                <a className={styles.copyright__logo_link}>
                  <h2>Homeo</h2>
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
      <Script
        strategy="lazyOnload"
        src={`https://www.google.com/recaptcha/api.js?onload=initCallback&render=explicit`}
      />
    </>
  );
}

export default Footer;
