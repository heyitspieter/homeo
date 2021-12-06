import className from "classnames";
import { useRef, useState } from "react";
import Animated from "src/components/Animated/Animated";
import Backdrop from "src/components/Backdrop/Backdrop";
import SearchFilter from "src/components/Search/SearchDesktop/SearchFilter/SearchFilter";

import modalStyles from "styles/modules/Modal.module.scss";
import styles from "src/components/Search/SearchMobile/SearchForm/SearchFormFilter/SearchFormFilter.module.scss";

const backdropConfig = {
  style: {
    zIndex: "100",
  },
};

const animationTiming = {
  exit: 400,
  enter: 400,
};

const SearchFormFilter = ({ close, show, applyFilters }) => {
  const ref = useRef();

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

  return (
    <Animated type="css" config={modalConfig}>
      <>
        <Backdrop config={backdropConfig} visibility={show} />
        <div className={modalOverlayClass}>
          <div className={modalStyles.backdrop}></div>
          <button onClick={close} className={modalStyles.btnClose}>
            <span>Close</span>
          </button>
          <div ref={ref} className={modalDialogClass}>
            <div className={modalStyles.content}>
              <div className={modalHeaderClass}></div>
              <div className={modalBodyClass}>
                <SearchFilter applyFilters={applyFilters} />
              </div>
            </div>
          </div>
        </div>
      </>
    </Animated>
  );
};

export default SearchFormFilter;
