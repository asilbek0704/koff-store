import classNames from 'classnames';
import { Container } from '../Container/Container';
import s from './Goods.module.scss';
import { CardItem } from '../../components/CardItem/CardItem';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/products/products.slice';
import { useSearchParams } from 'react-router-dom';

export const Goods = () => {
  const dispatch = useDispatch();

  const [searchParam] = useSearchParams();
  const category = searchParam.get('category');
  const q = searchParam.get('q');


  const { data, loading, error } = useSelector(store => store.products);

  useEffect(() => {
    dispatch(fetchProducts({ category, q }));
  }, [dispatch, category, q]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;


  return (
    <section>
      <Container>

        <h2 className={classNames(s.title, 'visually-hidden')}>
          Список товаров
        </h2>

        {data.length ? (
          <ul className={s.list}>
            {data.map(item => (
              <li key={item.id}>
                <CardItem {...item} />
              </li>
            ))}
          </ul>
        ) : <p>По ващему запросу ничего не найдено</p>}

      </Container>
    </section>
  );
};
