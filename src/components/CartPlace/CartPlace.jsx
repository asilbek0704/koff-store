import { declOfNum } from '../../helpers/declOfNum';
import s from './CartPlace.module.scss';

export const CartPlace = ({ totalCount, totalPrice }) => (
  <div className={s.place}>
    <h3 className={s.subtitle}> Оформление</h3>

    <div className={s.placeInfo}>
      <p>{declOfNum(totalCount, ['товар', 'товара', 'товаров'])} на сумму:</p>
      <p>{totalPrice.toLocaleString()} ₽</p>
    </div>

    <p className={s.placeDelivery}>Доставка 0 ₽</p>

    <button className={s.placeBtn} form='orderForm'>Оформить заказ</button>
  </div>
);
