import Link from "next/link";
import className from "classnames";
import { useContext } from "react";
import { useRouter } from "next/router";
import Svg from "src/components/Svg/Svg";
import { useAuth } from "src/context/AuthContext";
import styles from "src/components/Header/Header.module.scss";
import { SidedrawerContext } from "src/context/SidedrawerContext";

function Header({ toggleAuthModal }) {
  const router = useRouter();

  const { isAuthenticated } = useAuth();

  const sidedrawer = useContext(SidedrawerContext);

  const headerClass = className({
    [styles.container]: true,
    [styles.no_zIndex]: router.pathname !== "/",
  });

  const hamburgerClass = className({
    [styles.harmburger]: true,
    [styles.harmburger__fixed]: sidedrawer.open,
    [styles.harmburgerBlue]: !sidedrawer.open && router.pathname !== "/",
  });

  return (
    <>
      <div className={hamburgerClass}>
        <button onClick={() => sidedrawer.toggle()}>
          <Svg
            className={styles.iconHarmburger}
            symbol={sidedrawer.open ? "x" : "menu"}
          />
        </button>
      </div>
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
                <a href="#" className={styles.nav__list_link}>
                  Investment Consultancy
                </a>
              </li>
              <li className={styles.nav__list_item}>
                <a href="#" className={styles.nav__list_link}>
                  Hotel Management
                </a>
              </li>
              <li className={styles.nav__list_item}>
                <a href="#" className={styles.nav__list_link}>
                  Real Estate
                </a>
              </li>
              <li className={styles.nav__list_item}>
                <a href="#" className={styles.nav__list_link}>
                  Procurement
                </a>
              </li>
              <li className={styles.nav__list_item}>
                <a href="#" className={styles.nav__list_link}>
                  VIP Escort Services
                </a>
              </li>
            </ul>
          </nav>
          <div className={styles.menu}>
            <button
              onClick={() => {
                if (isAuthenticated) {
                  router.push("/account/me");
                } else {
                  toggleAuthModal();
                }
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
        </div>
      </div>
    </>
  );
}

export default Header;
