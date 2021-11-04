import { useRef } from "react";
import Animated from "src/components/Animated/Animated";

import styles from "src/components/Backdrop/Backdrop.module.scss";

const Backdrop = ({ config, visibility }) => {
  const ref = useRef();

  const backdropAnimConfig = {
    nodeRef: ref,
    mountOnEnter: true,
    unmountOnExit: true,
    in: visibility,
    timeout: {
      enter: 300,
      exit: 300,
    },
    classNames: {
      enter: "",
      enterActive: styles.show,
      exit: "",
      exitActive: styles.hide,
    },
  };

  return (
    <>
      <Animated type="css" config={backdropAnimConfig}>
        <div ref={ref} className={styles.container} {...config}></div>
      </Animated>
      <style jsx global>
        {`
          body {
            overflow: ${visibility ? `hidden` : `auto`}!important;
          }
        `}
      </style>
    </>
  );
};

export default Backdrop;
