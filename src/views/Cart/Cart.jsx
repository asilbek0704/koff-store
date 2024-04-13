import { CartForm } from '../../components/CartForm/CartForm';
import { CartPlace } from '../../components/CartPlace/CartPlace';
import { CartProducts } from '../../components/CartProducts/CartProducts';
import { Container } from '../Container/Container';
import s from './Cart.module.scss';
import { useSelector } from 'react-redux';

export const Cart = () => {
  const { products, totalPrice, totalCount } = useSelector(state => state.cart);

  if (!totalCount) {
    return (
      <section className={s.cart}>
        <Container className={s.container}>
          <h2 className={s.title}>Корзина пустая</h2>
        </Container>
      </section>
    );
  }

  return (
    <section className={s.cart}>
      <Container className={s.container}>
        <h2 className={s.title}>Корзина</h2>
        <CartProducts products={products} />
        <CartPlace totalCount={totalCount} totalPrice={totalPrice} />
        <CartForm />
      </Container>
    </section>
  );
};
