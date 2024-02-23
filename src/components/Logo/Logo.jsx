import logoSvg from "./logo.svg";
import s from "./Logo.module.scss";
import { Link } from "react-router-dom";

export const Logo = () => (
  <Link className={s.link} to="/">
    <img
      className={s.img}
      src={logoSvg}
      alt="Логотип мебельного маркета Koff"
    />
  </Link>
);
