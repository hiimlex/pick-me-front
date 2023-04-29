import { TCategoryFilter } from "app/models";
import { AppDispatch, RootState, fetchProducts, setFilters } from "app/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header, ProductCard } from "../../components";
import {
  Filter,
  HomeContainer,
  HomeContent,
  HomeContentTitle,
  HomeFilters,
  HomeProductsContainer,
} from "./styles";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { products, filters } = useSelector(
    (state: RootState) => state.products
  );
  const { categories } = useSelector((state: RootState) => state.categories);

  const handleCategoryFilter = (category: TCategoryFilter) => {
    dispatch(setFilters({ category }));
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, filters]);

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
              active={filters.category === ""}
              onClick={() => handleCategoryFilter("")}
            >
              all
            </Filter>
            {categories.map(({ name }, index) => (
              <Filter
                key={index}
                active={filters.category === name}
                onClick={() => handleCategoryFilter(name)}
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

export { HomePage };
