import { useDispatch, useSelector } from 'react-redux';
import s from './CartForm.module.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { submitFormCart } from '../../store/formCart/formCart.slice';

export const CartForm = () => {
  const [showAddress, setShowAddress] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const orderStatus = useSelector(state => state.formCart);

  useEffect(() => {
    if (orderStatus.success) {
      navigate(`/order/${orderStatus.orderId}`);
    }
  }, [orderStatus, navigate]);

  const onSubmit = data => {
    dispatch(submitFormCart(data));
  };

  return (
    <form className={s.form} id='orderForm' onSubmit={handleSubmit(onSubmit)}>
      <h3 className={s.subtitle}>Данные для доставки</h3>
      <fieldset className={s.fieldsetInput}>
        <label>
          <input
            className={s.input}
            type='text'
            placeholder='Фамилия Имя Отчество'
            {...register('name', { required: true })}
          />

          {errors.name && <p className={s.error}>Это поле обязательное</p>}
        </label>

        <label>
          <input
            className={s.input}
            type='tel'
            placeholder='Телефон'
            {...register('phone', { required: true })}
          />

          {errors.phone && <p className={s.error}>Это поле обязательное</p>}
        </label>

        <label>
          <input
            className={s.input}
            type='email'
            placeholder='E-mail'
            {...register('email', { required: true })}
          />

          {errors.email && <p className={s.error}>Это поле обязательное</p>}
        </label>

        {showAddress && (
          <label>
            <input
              className={s.input}
              type='text'
              placeholder='Адрес доставки'
              {...register('address', { required: true })}
            />

            {errors.address && <p className={s.error}>Это поле обязательное</p>}
          </label>
        )}

        <textarea
          className={s.textarea}
          name='comments'
          placeholder='Комментарий к заказу'
          {...register('comments')}
        ></textarea>
      </fieldset>

      <fieldset className={s.fieldsetRadio}>
        <legend className={s.legend}>Доставка</legend>
        <label className={s.radio}>
          <input
            className={s.radioInput}
            type='radio'
            value='delivery'
            onFocus={() => setShowAddress(true)}
            {...register('deliveryType', { required: true })}
          />
          Доставка
        </label>
        <label className={s.radio}>
          <input
            className={s.radioInput}
            type='radio'
            value='pickup'
            onFocus={() => setShowAddress(false)}
            {...register('deliveryType', { required: true })}
          />
          Самовывоз
        </label>
        {errors.deliveryType && <p>Выберите тип доставки</p>}
      </fieldset>

      <fieldset className={s.fieldsetRadio}>
        <legend className={s.legend}>Оплата</legend>

        <label className={s.radio}>
          <input
            className={s.radioInput}
            type='radio'
            value='card'
            {...register('paymentType', { required: true })}
          />
          Картой при получении
        </label>

        <label className={s.radio}>
          <input
            className={s.radioInput}
            type='radio'
            value='cash'
            {...register('paymentType', { required: true })}
          />
          Наличными при получении
        </label>

        {errors.paymentType && <p>Выберите способ оплаты</p>}
      </fieldset>
    </form>
  );
};
