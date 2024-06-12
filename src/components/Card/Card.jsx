import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../../views/Container/Container';
import { Slider } from '../../views/Slider/Slider';
import s from './Card.module.scss';
import { useParams } from 'react-router-dom';
import { clearProduct, fetchProduct } from '../../store/product/product.slice';
import { useEffect } from 'react';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';
import { AddCartButton } from '../AddCartButton/AddCartButton';

export const Card = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchProduct(productId));

    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, productId]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!data) return <div>Продукт не найден, попробуйте позже!</div>;

  return (
    <section className={s.card}>
      <Container className={s.container}>
        <h2 className={s.title}>{data.name}</h2>
        <Slider data={data} />

        <div className={s.info}>
          <p className={s.price}>{data.price.toLocaleString()}&nbsp;₽</p>
          <p className={s.article}>арт. {data.article}</p>

          <div>
            <h3 className={s.characteristicsTitle}>Общие характеристики</h3>

            <table className={s.table}>
              <tbody>
                {data.characteristics.map((item, i) => (
                  <tr className={s.row} key={i}>
                    <td className={s.field}>{item[0]}</td>
                    <td className={s.value}>{item[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={s.btns}>
            <AddCartButton className={s.btn} id={data.id} />
            <FavoriteButton className={s.like} id={data.id} />
          </div>
        </div>
      </Container>
    </section>
  );
};
