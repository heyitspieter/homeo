import { useRouter } from "next/router";
import Svg from "src/components/Svg/Svg";
import { useRef, useContext } from "react";
import Animated from "src/components/Animated/Animated";
import { SidedrawerContext } from "src/context/SidedrawerContext";
import styles from "src/components/Sidedrawer/Sidedrawer.module.scss";

function Sidedrawer({}) {
  const ref = useRef();

  const router = useRouter();

  const sidedrawer = useContext(SidedrawerContext);

  const animConfig = {
    nodeRef: ref,
    mountOnEnter: true,
    unmountOnExit: true,
    in: sidedrawer.open,
    timeout: { enter: 300, exit: 300 },
    classNames: {
      enter: "",
      enterActive: styles.open,
      exit: "",
      exitActive: styles.close,
    },
  };

  return (
    <Animated type="css" config={animConfig}>
      <>
        <div
          onClick={() => sidedrawer.toggle()}
          className={styles.backdrop}
        ></div>
        <div ref={ref} className={styles.container}>
          <div className={styles.logo}>
            <h2>Secutitex</h2>
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
              <li className={styles.nav__list_item}>
                <a href="#" className={styles.nav__list_link}>
                  Legal & Consulting
                </a>
              </li>
            </ul>
          </nav>
          <div className={styles.footer}>
            <button
              onClick={() => {
                sidedrawer.toggle();
                router.push("/listing/new");
              }}
              className={styles.btnListing}
            >
              <Svg className={styles.iconPlusCircle} symbol="plus-circle" />
              <span>Create Listing</span>
            </button>
          </div>
        </div>
      </>
    </Animated>
  );
}

export default Sidedrawer;
