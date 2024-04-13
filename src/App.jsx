import { useDispatch, useSelector } from 'react-redux';
import { Header } from './views/Header/Header';
import { Footer } from './views/Footer/Footer';
import { useEffect } from 'react';
import { fetchAccessToken } from './store/auth/auth.slice.js';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Catalog } from './views/Catalog/Catalog';
import { Goods } from './views/Goods/Goods';
import { Card } from './components/Card/Card';
import { Cart } from './views/Cart/Cart';
import { Container } from './views/Container/Container.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <main>
          <Catalog />
          <Goods />
        </main>
        <Footer />
      </>
    ),
  },
  {
    path: '/favorite',
    element: (
      <>
        <Header />
        <main>
          <Catalog />
          <Goods />
        </main>
        <Footer />
      </>
    ),
  },
  {
    path: '/category',
    element: (
      <>
        <Header />
        <main>
          <Catalog />
          <Goods />
        </main>
        <Footer />
      </>
    ),
  },
  {
    path: '/search',
    element: (
      <>
        <Header />
        <main>
          <Catalog />
          <Goods />
        </main>
        <Footer />
      </>
    ),
  },
  {
    path: '/cart',
    element: (
      <>
        <Header />
        <main>
          <Cart />
        </main>
        <Footer />
      </>
    ),
  },
  {
    path: '/product/:productId',
    element: (
      <>
        <Header />
        <main>
          <Catalog />
          <Card />
        </main>
        <Footer />
      </>
    ),
  },
]);

const App = () => {
  const dispatch = useDispatch();
  const { accessToken, loading } = useSelector(state => state.auth);

  useEffect(() => {
    if (!accessToken) {
      dispatch(fetchAccessToken());
    }
  }, [dispatch, accessToken]);

  if (loading) {
    return <Container><div>Загрузка...</div></Container>;
  }

  return <RouterProvider router={router} />;
};

export default App;
