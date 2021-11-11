import { useRef } from "react";
import Animated from "src/components/Animated/Animated";

import styles from "src/components/PreviewModeDialog/PreviewModeDialog.module.scss";

function PreviewModeDialog({ previewModeDialog, endPreviewSession }) {
  const ref = useRef();

  const animationTiming = {
    exit: 500,
    enter: 500,
  };

  const animConfig = {
    nodeRef: ref,
    mountOnEnter: true,
    unmountOnExit: true,
    in: previewModeDialog,
    timeout: animationTiming,
    classNames: {
      enter: "",
      enterActive: styles.show,
      exit: "",
      exitActive: styles.hide,
    },
  };

  return (
    <Animated type="css" config={animConfig}>
      <div ref={ref} className={styles.container}>
        <p>Preview Mode</p>
        <button onClick={() => endPreviewSession()}>End Session</button>
      </div>
    </Animated>
  );
}

export default PreviewModeDialog;
