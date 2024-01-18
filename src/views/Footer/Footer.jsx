import { Contacts } from "../../components/Contacts/Contacts";
import { Developers } from "../../components/Developers/Developers";
import { Logo } from "../../components/Logo/Logo";
import { Container } from "../Container/Container";
import s from "./Footer.module.scss"

export const Footer = () => (
  <footer className={s.footer}>
    <Container className={s.container}>
      <div className={s.logo}>
        <Logo />
      </div>

      <div className={s.contacts}>
        <Contacts />
      </div>

      <div className={s.developers}>
        <Developers />
      </div>

      <p className={s.copyright}>© Koff, 2024</p>
    </Container>
  </footer>
);
