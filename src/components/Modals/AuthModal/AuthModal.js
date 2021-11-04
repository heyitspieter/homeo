import className from "classnames";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import Animated from "src/components/Animated/Animated";
import Backdrop from "src/components/Backdrop/Backdrop";

import modalStyles from "styles/modules/Modal.module.scss";
import styles from "src/components/Modals/AuthModal/AuthModal.module.scss";

const backdropConfig = {
  style: {
    zIndex: "100",
  },
};

const animationTiming = {
  exit: 400,
  enter: 400,
};

const Login = dynamic(() => import("src/containers/Login/Login"));
const Register = dynamic(() => import("src/containers/Register/Register"));

const AuthModal = ({ close, show }) => {
  const modalNodeRef = useRef();

  const [activeTab, setActiveTab] = useState(0);

  const modalBodyClass = className({
    [modalStyles.content__body]: true,
    [modalStyles.no__padding__t]: true,
    [modalStyles.no__padding__lr]: true,
  });

  const modalHeaderClass = className({
    [modalStyles.content__header]: true,
    [modalStyles.no__padding]: true,
    [modalStyles.no__border]: true,
  });

  const modalDialogClass = className({
    [modalStyles.dialog]: true,
    [styles.dialog__width]: true,
  });

  const modalOverlayClass = className({
    [modalStyles.overlay]: true,
    [modalStyles.overlay__hidden]: !show,
  });

  const modalConfig = {
    nodeRef: modalNodeRef,
    mountOnEnter: true,
    unmountOnExit: true,
    in: show,
    timeout: animationTiming,
    classNames: {
      enter: "",
      enterActive: modalStyles.open,
      exit: "",
      exitActive: modalStyles.close,
    },
  };

  const btnLoginClass = className({
    [styles.tabLogin]: true,
    [styles.activeTab]: activeTab === 0,
  });

  const btnRegisterClass = className({
    [styles.tabRegister]: true,
    [styles.activeTab]: activeTab === 1,
  });

  const closeModal = () => {
    close();
    setActiveTab(0);
  };

  return (
    <Animated type="css" config={modalConfig}>
      <>
        <Backdrop config={backdropConfig} visibility={show} />
        <div className={modalOverlayClass}>
          <div className={modalStyles.backdrop}></div>
          <button onClick={closeModal} className={modalStyles.btnClose}>
            <span>Close</span>
          </button>
          <div ref={modalNodeRef} className={modalDialogClass}>
            <div className={modalStyles.content}>
              <div className={modalHeaderClass}></div>
              <div className={modalBodyClass}>
                <div className={styles.tabs}>
                  <a
                    onClick={() => setActiveTab(0)}
                    className={btnLoginClass}
                    href="#Login"
                  >
                    Login
                  </a>
                  <a
                    onClick={() => setActiveTab(1)}
                    className={btnRegisterClass}
                    href="#Register"
                  >
                    Register
                  </a>
                </div>
                <div className={styles.formSlider}>
                  <Login />
                  <Register activeTab={activeTab} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Animated>
  );
};

export default AuthModal;
