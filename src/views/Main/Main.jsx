import { useDispatch, useSelector } from "react-redux";
import { Goods } from "../../components/Goods/Goods";
import { fetchCategories } from "../../store/categories/category.slice";
import { useEffect } from "react";
import { Catalog } from "../../components/Catalog/Catalog";

export const Main = () => {
  const dispatch = useDispatch();
  const {
    data: dataCategories,
    loading: loadingCategories,
    error: errorCategories,
  } = useSelector((store) => store.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loadingCategories) return <div>Загрузка...</div>;
  if (errorCategories) return <div>Ошибка {errorCategories}</div>;

  return (
    <main>
      <Catalog data={dataCategories} />
      <Goods />
    </main>
  );
};
