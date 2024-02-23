import { Link } from 'react-router-dom';
import { API_URI } from '../../helpers/const';
import s from './CardItem.module.scss';

export const CardItem = ({ name, images: [image], price, id }) => (
  <article className={s.card}>
    <Link className={s.link} to={`/product/${id}`}>
      <img className={s.img} src={`${API_URI}${image}`} alt={name} />
    </Link>
    <div className={s.info}>
      <h3 className={s.title}>
        <Link className={s.link} to={`/product/${id}`}>
          {name}
        </Link>
      </h3>
      <p className={s.price}>{price.toLocaleString()}&nbsp;₽</p>
    </div>

    <button className={s.btn}>В корзину</button>
    <button className={s.favorite}>
      <svg
        width='16'
        height='14'
        viewBox='0 0 16 14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M8.41337 12.8733C8.18671 12.9533 7.81337 12.9533 7.58671 12.8733C5.65337 12.2133 1.33337 9.45998 1.33337 4.79332C1.33337 2.73332 2.99337 1.06665 5.04004 1.06665C6.25337 1.06665 7.32671 1.65332 8.00004 2.55998C8.67337 1.65332 9.75337 1.06665 10.96 1.06665C13.0067 1.06665 14.6667 2.73332 14.6667 4.79332C14.6667 9.45998 10.3467 12.2133 8.41337 12.8733Z'
          fill='white'
          stroke='#1C1C1C'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </button>
  </article>
);
