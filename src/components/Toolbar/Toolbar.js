import { useRouter } from "next/router";
import Svg from "src/components/Svg/Svg";

import styles from "src/components/Toolbar/Toolbar.module.scss";

function Toolbar({}) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} className={styles.btnBack}>
        <Svg className={styles.iconBack} symbol="arrow-left" />
        <span>Go Back</span>
      </button>
    </div>
  );
}

export default Toolbar;
