import classNames from 'classnames';
import { Container } from '../../views/Container/Container';
import s from './Goods.module.scss';
import { CardItem } from '../CardItem/CardItem';

export const Goods = ({ data }) => {
  return (
    <section>
      <Container>
        <h2 className={classNames(s.title, 'visually-hidden')}>
          Список товаров
        </h2>

        <ul className={s.list}>
          {data.map(item => (
            <li key={item.id}>
              <CardItem {...item} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
