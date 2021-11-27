import Image from "next/image";
import className from "classnames";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Svg from "src/components/Svg/Svg";
import { useAuth } from "src/context/AuthContext";
import ActiveButton from "src/components/ActiveButton/ActiveButton";

import styles from "src/components/TabBar/TabBar.module.scss";

function TabBar({ toggleAuthModal }) {
  const router = useRouter();

  const { isAuthenticated } = useAuth();

  const visibility = useSelector((state) => state.tabBar.visibility);

  const tabBarClass = className({
    [styles.container]: true,
    [styles.translateY__top]: visibility,
    [styles.translateY__bottom]: !visibility,
  });

  return (
    <div className={tabBarClass}>
      <div className={styles.grid}>
        <ActiveButton activeClassName={styles.activeTab}>
          <button id="/" onClick={() => router.push("/")}>
            <Svg className={styles.iconHome} symbol="home-glyph" />
            <span>Home</span>
          </button>
        </ActiveButton>
        <ActiveButton activeClassName={styles.activeTab}>
          <button id="/search" onClick={() => router.push("/search?v=mobile")}>
            <Svg className={styles.iconSearch} symbol="search-glyph" />
            <span>Search</span>
          </button>
        </ActiveButton>
        <ActiveButton activeClassName={styles.activeTab}>
          <button id="/listing/new" onClick={() => router.push("/listing/new")}>
            <Svg className={styles.iconCreate} symbol="create-glyph" />
            <span>New Listing</span>
          </button>
        </ActiveButton>
        <ActiveButton activeClassName={styles.activeTab}>
          <button id="/favorites" onClick={() => router.push("/favorites")}>
            <Svg className={styles.iconFavorite} symbol="favorite-glyph" />
            <span>Favorites</span>
          </button>
        </ActiveButton>
        <ActiveButton activeClassName={styles.activeTab}>
          <button
            id="/account/me"
            onClick={() => {
              if (isAuthenticated) {
                router.push("/account/me");
              } else {
                toggleAuthModal();
              }
            }}
          >
            <figure>
              <Image
                src="/images/avatar.jpg"
                width={200}
                height={200}
                alt="Avatar"
              />
            </figure>
            <span>Account</span>
          </button>
        </ActiveButton>
      </div>
    </div>
  );
}

export default TabBar;
