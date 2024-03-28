import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import 'swiper/css';
import { Container } from '../../views/Container/Container';
import s from './Card.module.scss';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const Card = () => {
  const [mainSwiper, setMainSwiper] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const { productId } = useParams();

  return (
    <section className={s.card}>
      <Container className={s.container}>
        <h2 className={s.title}>Кресло с подлокотниками</h2>
        <div className={s.picture}>
          <div className={s.sliderMain}>
            <Swiper
              modules={[Thumbs]}
              thumbs={{ swiper: thumbsSwiper }}
              onSwiper={setMainSwiper}
              spaceBetween={10}
            >
              <SwiperSlide>
                <img src='/img/photo.jpg' alt='Кресло с подлокотниками' />
              </SwiperSlide>

              <SwiperSlide>
                <img src='/img/photo.jpg' alt='Кресло с подлокотниками' />
              </SwiperSlide>

              <SwiperSlide>
                <img src='/img/photo.jpg' alt='Кресло с подлокотниками' />
              </SwiperSlide>

              <SwiperSlide>
                <img src='/img/photo.jpg' alt='Кресло с подлокотниками' />
              </SwiperSlide>

              <SwiperSlide>
                <img src='/img/photo.jpg' alt='Кресло с подлокотниками' />
              </SwiperSlide>
            </Swiper>
            <button onClick={() => mainSwiper.slidePrev()}>prev</button>
            <button onClick={() => mainSwiper.slideNext()}>next</button>
          </div>

          <div className={s.sliderThumbnails}>
            <Swiper
              spaceBetween={14}
              slidesPerView={4}
              watchSlidesProgress
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
            >
              <SwiperSlide>
                <img src='/img/photo.jpg' alt='Кресло с подлокотниками' />
              </SwiperSlide>

              <SwiperSlide>
                <img src='/img/photo.jpg' alt='Кресло с подлокотниками' />
              </SwiperSlide>

              <SwiperSlide>
                <img src='/img/photo.jpg' alt='Кресло с подлокотниками' />
              </SwiperSlide>

              <SwiperSlide>
                <img src='/img/photo.jpg' alt='Кресло с подлокотниками' />
              </SwiperSlide>

              <SwiperSlide>
                <img src='/img/photo.jpg' alt='Кресло с подлокотниками' />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        <div className={s.info}>
          <p className={s.price}>{'5000'.toLocaleString()}&nbsp;₽</p>
          <p className={s.article}>арт. 84348945757</p>

          <div className={s.params}>
            <h3>Общие характеристики</h3>
          </div>
        </div>
      </Container>
    </section>
  );
};
