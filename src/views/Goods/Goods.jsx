import classNames from 'classnames';
import { Container } from '../Container/Container';
import s from './Goods.module.scss';
import { CardItem } from '../../components/CardItem/CardItem';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/products/products.slice';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Pagination } from '../../components/Pagination/Pagination';

export const Goods = () => {
  const dispatch = useDispatch();
  const { data, loading, error, pagination } = useSelector(state => state.products);
  const { favoriteList } = useSelector(state => state.favorite);

  const [searchParam] = useSearchParams();
  const category = searchParam.get('category');
  const q = searchParam.get('q');
  const page = searchParam.get('page');

  const { pathname } = useLocation();


  useEffect(() => {
    if (pathname !== '/favorite') {
      dispatch(fetchProducts({ category, q, page }));
    }
  }, [dispatch, category, q, pathname, page]);


  useEffect(() => {
    if (pathname === '/favorite') {
      dispatch(fetchProducts({ list: favoriteList.join(','), page }));
    }
  }, [dispatch, favoriteList, pathname, page]);

  if (loading) return <Container><div>Загрузка...</div></Container>;
  if (error) return <Container><div>Ошибка: {error}</div></Container>;


  return (
    <section>
      <Container>
        <h2 className={classNames(s.title, 'visually-hidden')}>
          Список товаров
        </h2>

        {data.length ? (
          <>
            <ul className={s.list}>
              {data.map(item => (
                <li key={item.id}>
                  <CardItem {...item} />
                </li>
              ))}
            </ul>

            {pagination ? <Pagination pagination={pagination} /> : null}</>
        ) : <p>По вашему запросу ничего не найдено</p>}
      </Container>
    </section>
  );
};
