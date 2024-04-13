import { API_URL } from '../../helpers/const';
import {
  removeProductFromCart,
  updateProductInCart,
} from '../../store/cart/cart.slice';
import s from './CartProducts.module.scss';
import { useDispatch } from 'react-redux';

export const CartProducts = ({ products }) => {
  const dispatch = useDispatch();

  const handleMinus = (id, quantity) => {
    if (quantity > 1) {
      dispatch(
        updateProductInCart({
          productId: id,
          quantity: quantity - 1,
        })
      );
    } else {
      dispatch(removeProductFromCart(id));
    }
  };

  const handlePlus = (id, quantity) => {
    dispatch(
      updateProductInCart({
        productId: id,
        quantity: quantity + 1,
      })
    );
  };

  return (
    <ul className={s.products}>
      {products.map(
        ({ id, images: [image], name, price, article, quantity }) => (
          <li className={s.product} key={id}>
            <img className={s.img} src={`${API_URL}${image}`} alt={name} />

            <h3 className={s.titleProduct}>{name}</h3>
            <p className={s.price}>{(price * quantity).toLocaleString()}&nbsp;₽</p>
            <p className={s.article}>арт. {article}</p>

            <div className={s.productControl}>
              <button
                className={s.productBtn}
                onClick={() => handleMinus(id, quantity)}
              >
                -
              </button>

              <p className={s.productCount}>{quantity}</p>

              <button
                className={s.productBtn}
                onClick={() => handlePlus(id, quantity)}
              >
                +
              </button>
            </div>
          </li>
        )
      )}
    </ul>
  );
};
