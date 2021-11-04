import { TransitionGroup, CSSTransition } from "react-transition-group";

const Animated = ({ type, children, config }) => {
  const renderAnimated = () => {
    switch (type) {
      case "group":
        return <TransitionGroup component={null}>{children}</TransitionGroup>;
      case "css":
        return <CSSTransition {...config}>{children}</CSSTransition>;
      default:
        break;
    }
  };

  return <>{renderAnimated()}</>;
};

export default Animated;