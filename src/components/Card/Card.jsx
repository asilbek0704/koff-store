import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../../views/Container/Container';
import { Slider } from '../../views/Slider/Slider';
import s from './Card.module.scss';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../../store/product/product.slice';
import { useEffect } from 'react';

export const Card = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId])

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  console.log(data)

  return (
    <section className={s.card}>
      <Container className={s.container}>
        <h2 className={s.title}>Кресло с подлокотниками</h2>
        <Slider data={data} />

        <div className={s.info}>
          <p className={s.price}>{'5000'.toLocaleString()}&nbsp;₽</p>
          <p className={s.article}>арт. 84348945757</p>

          <div>
            <h3 className={s.characteristicsTitle}>Общие характеристики</h3>

            <table className={s.table}>
              <tbody>
                {data?.characteristics.map((item, i) => (
                  <tr className={s.row} key={i}>
                    <td className={s.field}>{item[0]}</td>
                    <td className={s.value}>{item[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={s.btns}>
            <button className={s.btn}>В корзину</button>
            <button className={s.like}>
              <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.4135 12.8733C8.18683 12.9533 7.8135 12.9533 7.58683 12.8733C5.6535 12.2133 1.3335 9.45998 1.3335 4.79332C1.3335 2.73332 2.9935 1.06665 5.04016 1.06665C6.2535 1.06665 7.32683 1.65332 8.00016 2.55998C8.6735 1.65332 9.7535 1.06665 10.9602 1.06665C13.0068 1.06665 14.6668 2.73332 14.6668 4.79332C14.6668 9.45998 10.3468 12.2133 8.4135 12.8733Z"
                  fill="white" stroke="#1C1C1C" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};
