import { useRouter } from "next/router";

const ActiveButton = ({ children, ...props }) => {
  const router = useRouter();
  let className = null;

  let href = children.props && children.props.id;

  if (
    (router.asPath.split("?")[0] === href ||
      router.asPath.split("#")[0] === href) &&
    props.activeClassName
  ) {
    className = props.className
      ? `${props.className} ${props.activeClassName}`
      : props.activeClassName;
  }

  delete props.activeClassName;

  return (
    <div {...props} className={className}>
      {children}
    </div>
  );
};

export default ActiveButton;
