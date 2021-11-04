import Image from "next/image";
import Svg from "src/components/Svg/Svg";

import styles from "src/components/PropertyExplore/PropertyExplore.module.scss";

function PropertyExploreItem({ title, icon, imgsrc }) {
  return (
    <div className={styles.grid__item}>
      <div className={styles.grid__item_overlay}>
        <Svg className={styles.icon} symbol={icon} />
        <p>{title}</p>
      </div>
      <div className={styles.grid__item_img}>
        <figure>
          <Image
            src={`/images/${imgsrc}`}
            alt="House 1"
            height={240}
            width={180}
          />
        </figure>
      </div>
    </div>
  );
}

export default PropertyExploreItem;
