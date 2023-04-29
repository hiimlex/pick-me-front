import { IProduct } from "../../../app/models";
import { renderBufferToImg } from "../../pages/Profile";
import {
  ProductCardContainer,
  ProductImage,
  ProductInfo,
  ProductInfoName,
  ProductInfoOwner,
  ProductInfoPrice,
  ProductInfoQuantity,
  ProductInfoRow,
} from "./styles";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <ProductCardContainer className="product__card" color={product.postColor}>
      <ProductImage src={renderBufferToImg(product.imageData)} />
      <ProductInfo>
        <ProductInfoRow>
          <ProductInfoName>{product.name}</ProductInfoName>
          <ProductInfoPrice>R$ {product.price}</ProductInfoPrice>
        </ProductInfoRow>
        <ProductInfoRow>
          <ProductInfoOwner>@{product.owner.username}</ProductInfoOwner>
          <ProductInfoQuantity>{product.quantity}x</ProductInfoQuantity>
        </ProductInfoRow>
      </ProductInfo>
    </ProductCardContainer>
  );
};

export { ProductCard };
