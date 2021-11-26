import Skeleton from "react-loading-skeleton";

import styles from "src/containers/Finder/Professions/Professions.module.scss";

const ProfessionsSkeleton = () => {
  const professions = Array(6).fill("pr");

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>
          <Skeleton width={250} />
        </h2>
      </div>
      <div className={styles.grid}>
        {professions.map((profession, index) => {
          return (
            <div key={index} className={styles.grid__item_sk}>
              <Skeleton height={64} />
            </div>
          );
        })}
      </div>
      <div className={styles.action}>
        <span style={{ marginLeft: "auto" }}>
          <Skeleton width={57} height={29} />
        </span>
      </div>
    </div>
  );
};

export default ProfessionsSkeleton;
