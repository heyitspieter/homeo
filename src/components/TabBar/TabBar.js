import Image from "next/image";
import { useRouter } from "next/router";
import Svg from "src/components/Svg/Svg";
import ActiveButton from "src/components/ActiveButton/ActiveButton";

import styles from "src/components/TabBar/TabBar.module.scss";

function TabBar() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <ActiveButton activeClassName={styles.activeTab}>
          <button id="/" onClick={() => router.push("/")}>
            <Svg className={styles.iconHome} symbol="home-glyph" />
            <span>Home</span>
          </button>
        </ActiveButton>
        <ActiveButton activeClassName={styles.activeTab}>
          <button id="/search" onClick={() => router.push("/search")}>
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
          <button id="/favorite" onClick={() => router.push("/favorite")}>
            <Svg className={styles.iconFavorite} symbol="favorite-glyph" />
            <span>Favorites</span>
          </button>
        </ActiveButton>
        <ActiveButton activeClassName={styles.activeTab}>
          <button id="/account/me" onClick={() => router.push("/account/me")}>
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
