import dynamic from "next/dynamic";
import className from "classnames";
import { useRef, useState } from "react";
import Animated from "src/components/Animated/Animated";
import Backdrop from "src/components/Backdrop/Backdrop";
import Professions from "src/containers/Finder/Professions/Professions";

const JobInfo = dynamic(() => import("src/containers/Finder/JobInfo/JobInfo"), {
  loading: () => <p>Loading..</p>,
});

import styles from "src/containers/Finder/Finder.module.scss";
import modalStyles from "styles/modules/Modal.module.scss";

const backdropConfig = {
  style: {
    zIndex: "100",
  },
};

const animationTiming = {
  exit: 400,
  enter: 400,
};

function Finder({ close, show }) {
  const ref = useRef();

  const [jobData, setJobData] = useState({
    files: [],
    contact: null,
    profession: null,
    description: null,
  });

  const [currentStep, setCurrentStep] = useState(0);

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
    nodeRef: ref,
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

  const closeModal = () => {
    close();
    setJobData({
      files: [],
      contact: null,
      profession: null,
      description: null,
    });
    setCurrentStep(0);
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
          <div ref={ref} className={modalDialogClass}>
            <div className={modalStyles.content}>
              <div className={modalHeaderClass}></div>
              <div className={modalBodyClass}>
                <div className={styles.container}>
                  <Professions
                    jobData={jobData}
                    setJobData={setJobData}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                  />
                  <JobInfo
                    jobData={jobData}
                    setJobData={setJobData}
                    closeFinder={closeModal}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Animated>
  );
}

export default Finder;
