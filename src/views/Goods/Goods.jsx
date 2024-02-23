import classNames from 'classnames';
import { Container } from '../Container/Container';
import s from './Goods.module.scss';
import { CardItem } from '../../components/CardItem/CardItem';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/products/products.slice';

export const Goods = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(store => store.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;


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
