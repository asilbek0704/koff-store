import classNames from "classnames";
import { Container } from "../../views/Container/Container";
import s from "./Goods.module.scss";
import { CardItem } from "../CardItem/CardItem";

export const Goods = () => {
  return (
    <section>
      <Container>
        <h2 className={classNames(s.title, "visually-hidden")}>
          Список товаров
        </h2>

        <ul className={s.list}>
          <li>
            <CardItem />
          </li>
        </ul>
      </Container>
    </section>
  );
};
