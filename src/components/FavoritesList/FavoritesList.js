import Image from "next/image";
import { truncate } from "src/helpers";
import Svg from "src/components/Svg/Svg";
import styles from "src/components/FavoritesList/FavoritesList.module.scss";

function FavoritesList() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>My Favorites</h2>
        <p>Properties you liked will show here</p>
      </div>
      <div className={styles.list}>
        <div className={styles.list__item}>
          <div className={styles.item__col}>
            <figure className={styles.item__image}>
              <Image
                src="/images/home-1.jpg"
                layout="responsive"
                alt="Home 1"
                height={80}
                width={100}
              />
            </figure>
            <div>
              <h3>New Apartment Nice View</h3>
              <p>Quincy St, Brooklyn, NY, USA</p>
              <p>$2,500/mo</p>
            </div>
          </div>
          <div className={styles.item__col}>
            <button>
              <Svg className={styles.iconTrash} symbol="trash" />
            </button>
          </div>
        </div>
        <div className={styles.list__item}>
          <div className={styles.item__col}>
            <figure className={styles.item__image}>
              <Image
                src="/images/home-2.jpg"
                layout="responsive"
                alt="Home 2"
                height={80}
                width={100}
              />
            </figure>
            <div>
              <h3>New Apartment Nice View</h3>
              <p>Quincy St, Brooklyn, NY, USA</p>
              <p>$2,500/mo</p>
            </div>
          </div>
          <div className={styles.item__col}>
            <button>
              <Svg className={styles.iconTrash} symbol="trash" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavoritesList;
