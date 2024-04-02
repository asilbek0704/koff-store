import { Link } from 'react-router-dom';
import { API_URL } from '../../helpers/const';
import s from './CardItem.module.scss';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';

export const CardItem = ({ name, images: [image], price, id }) => (
  <article className={s.card}>
    <Link className={s.link} to={`/product/${id}`}>
      <img className={s.img} src={`${API_URL}${image}`} alt={name} />
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
    <FavoriteButton className={s.favorite} id={id} />
  </article>
);
