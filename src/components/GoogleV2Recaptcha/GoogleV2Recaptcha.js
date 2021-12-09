import { useRef, useEffect } from "react";
import Backdrop from "src/components/Backdrop/Backdrop";
import Animated from "src/components/Animated/Animated";

import styles from "src/components/GoogleV2Recaptcha/GoogleV2Recaptcha.module.scss";

const htmlElement = "sec-v2recaptcha";

const GoogleV2Recaptcha = ({ visible, setResponse }) => {
  const ref = useRef();

  const onVerifyCallback = (response) => setResponse(response);

  useEffect(() => {
    if (visible) {
      window.grecaptcha.ready(() => {
        window.grecaptcha.render(htmlElement, {
          sitekey: process.env.NEXT_PUBLIC_G_RECAPTCHA_KEY_V2,
          callback: (response) => onVerifyCallback(response),
        });
      });
    }
  }, [visible]);

  const config = {
    in: visible,
    nodeRef: ref,
    classNames: {
      enter: "",
      enterActive: "",
      exit: "",
      exitActive: "",
    },
    mountOnEnter: true,
    unmountOnExit: true,
    timeout: { enter: 300, exit: 300 },
  };

  return (
    <>
      <Backdrop visibility={visible} config={{ style: { zIndex: "45" } }} />
      <Animated type="css" config={config}>
        <div className={styles.container} ref={ref} id={htmlElement}></div>
      </Animated>
      <style jsx global>
        {`
          body {
            overflow: ${visible ? "hidden" : "auto"}!important;
          }
        `}
      </style>
    </>
  );
};

export default GoogleV2Recaptcha;
