import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../Container/Container';
import s from './Catalog.module.scss';
import { useEffect } from 'react';
import { fetchCategories } from '../../store/categories/category.slice';
import { Link } from 'react-router-dom';

export const Catalog = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(store => store.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <nav className={s.catalog}>
      <Container className={s.container}>
        <ul className={s.list}>
          {data.map((item, i) => (
            <li key={i}>
              <Link className={s.link} to={`category?slug=${item}`}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
};
