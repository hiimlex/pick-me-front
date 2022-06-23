import styled from "styled-components";
import { mainTextColor, secondaryTextColor } from "../../styles/theme";

export const ProductCardContainer = styled.div<{ color: string }>`
  display: inline-block;

  width: fit-content;
  max-width: 320px;
  height: 100%;
  overflow: hidden;
  background: ${({ color }) => color};
  border-radius: 12px;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: auto;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 12px;
  width: 100%;
  align-self: flex-end;
`;

export const ProductInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const ProductInfoName = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: ${mainTextColor};
`;

export const ProductInfoPrice = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: ${mainTextColor};
`;

export const ProductInfoOwner = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${secondaryTextColor};
`;

export const ProductInfoQuantity = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${secondaryTextColor};
`;
