import classNames from "classnames";
import s from "./Container.module.scss";

export const Container = (props) => (
  <div className={classNames(s.container, props.className)}>
    {props.children}
  </div>
)