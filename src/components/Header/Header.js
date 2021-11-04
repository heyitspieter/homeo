import Link from "next/link";
import className from "classnames";
import { useRouter } from "next/router";
import Svg from "src/components/Svg/Svg";
import styles from "src/components/Header/Header.module.scss";

function Header({ toggleAuthModal }) {
  const router = useRouter();

  const headerClass = className({
    [styles.container]: true,
    [styles.no_zIndex]: router.pathname !== "/",
  });

  return (
    <div className={headerClass}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Link href="/">
            <a className={styles.logo__link}>
              <h2>Secutitex</h2>
            </a>
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            <li className={styles.nav__list_item}>
              <Link href="/search?q=for-sale">
                <a className={styles.nav__list_link}>For Sale</a>
              </Link>
            </li>
            <li className={styles.nav__list_item}>
              <Link href="/search?q=for-rent">
                <a className={styles.nav__list_link}>For Rent</a>
              </Link>
            </li>
            <li className={styles.nav__list_item}>
              <a href="#" className={styles.nav__list_link}>
                Legal & Consulting
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.menu}>
          <button
            onClick={() => {
              toggleAuthModal();
            }}
            className={styles.btnUser}
          >
            <Svg className={styles.iconUser} symbol="user" />
          </button>
          <button
            onClick={() => router.push("/listing/new")}
            className={styles.btnListing}
          >
            <Svg className={styles.iconPlusCircle} symbol="plus-circle" />
            <span>Create Listing</span>
          </button>
        </div>
        <div className={styles.harmburger}>
          <button>
            <Svg className={styles.iconHarmburger} symbol="menu" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
