import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../app/services";
import { RootState, setProducts } from "../../../app/store";
import { createNotification } from "../../../app/store/slicers/notifier.slicer";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import {
  Filter,
  HomeContainer,
  HomeContent,
  HomeContentTitle,
  HomeFilters,
  HomeProductsContainer,
} from "./styles";

type CategoryFilter = "all" | "picture" | "service" | "product";

const HomePage = () => {
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const dispatch = useDispatch();

  const { products } = useSelector((state: RootState) => state.products);
  const { categories } = useSelector((state: RootState) => state.categories);

  const handleFilter = (filter: string) => {
    setFilter(filter as CategoryFilter);
  };

  const handleGetProducts = useCallback(async () => {
    try {
      const { data } = await getProducts();

      dispatch(setProducts(data));
    } catch (err: any) {
      if (err instanceof AxiosError) {
        const { response } = err;

        if (response && response.data && response.data.message) {
          dispatch(
            createNotification({
              message: response.data.message,
            })
          );
        }
      }
    }
  }, [dispatch]);

  useEffect(() => {
    handleGetProducts();
  }, [handleGetProducts]);

  return (
    <>
      <Header />
      <HomeContainer>
        <HomeContent>
          <HomeContentTitle>
            <b>for you</b> arts
          </HomeContentTitle>
          <HomeFilters>
            <Filter
              active={filter === "all"}
              onClick={() => handleFilter("all")}
            >
              all
            </Filter>
            {categories.map(({ name }, index) => (
              <Filter
                key={index}
                active={filter === name}
                onClick={() => handleFilter(name)}
              >
                {name}
              </Filter>
            ))}
          </HomeFilters>
          <HomeProductsContainer>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </HomeProductsContainer>
        </HomeContent>
      </HomeContainer>
    </>
  );
};

export default HomePage;
