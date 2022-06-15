import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../../../app/services";
import { createNotification } from "../../../app/store/slicers/notifier.slicer";
import Header from "../../components/Header";
import {
  Filter,
  HomeContainer,
  HomeContent,
  HomeContentTitle,
  HomeFilters,
  HomeProductsContainer,
} from "./styles";

type CategoryFilter = "all" | "pictures" | "services" | "products";

const HomePage = () => {
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [products, setProducts] = useState<any[]>([]);
  const dispatch = useDispatch();

  const handleFilter = (filter: CategoryFilter) => {
    setFilter(filter);
  };

  const handleGetProducts = useCallback(async () => {
    try {
      const { data } = await getProducts();

      setProducts(data);
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
            <Filter
              active={filter === "pictures"}
              onClick={() => handleFilter("pictures")}
            >
              pictures
            </Filter>
            <Filter
              active={filter === "services"}
              onClick={() => handleFilter("services")}
            >
              services
            </Filter>
            <Filter
              active={filter === "products"}
              onClick={() => handleFilter("products")}
            >
              products
            </Filter>
          </HomeFilters>
          <HomeProductsContainer></HomeProductsContainer>
        </HomeContent>
      </HomeContainer>
    </>
  );
};

export default HomePage;
