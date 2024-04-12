import s from './CartProducts.module.scss';

export const CartProducts = () => {
  return (
    <ul className={s.products}>
      <li className={s.product} key={1}>
        <img className={s.img}
          src="https://koff-api.vercel.app/img//1hb42m9c7toa62q5.jpg"
          alt="Диван" />

        <h3 className={s.titleProduct}>Диван</h3>
        <p className={s.price}>{Number('294142').toLocaleString()}&nbsp;₽</p>
        <p className={s.article}>арт. 16955237304</p>

        <div className={s.productControl}>
          <button className={s.productBtn}>-</button>
          <p className={s.productCount}>3</p>
          <button className={s.productBtn}>+</button>
        </div>
      </li>
      
      <li className={s.product} key={2}>
        <img className={s.img}
          src="https://koff-api.vercel.app/img//1hb42m9c7toa62q5.jpg"
          alt="Диван" />

        <h3 className={s.titleProduct}>Диван 2</h3>
        <p className={s.price}>{Number('294142').toLocaleString()}&nbsp;₽</p>
        <p className={s.article}>арт. 16955237304</p>

        <div className={s.productControl}>
          <button className={s.productBtn}>-</button>
          <p className={s.productCount}>3</p>
          <button className={s.productBtn}>+</button>
        </div>
      </li>
    </ul>
  )
}