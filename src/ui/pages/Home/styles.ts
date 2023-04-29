import styled, { css } from "styled-components";
import {
  mainColorTheme,
  mainTextColor,
  secondaryColorTheme,
} from "../../styles/theme";

export const HomeContainer = styled.div`
  width: 100%;
`;

export const HomeContent = styled.div`
  padding: 42px 64px;
`;

export const HomeContentTitle = styled.div`
  font-size: 22px;
  margin-bottom: 12px;
`;

export const HomeFilters = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  margin-bottom: 32px;
`;

const activeStyle = css`
  color: ${mainColorTheme};
  font-weight: bold;
  text-decoration: underline;
  text-underline-offset: 6px;
  text-decoration-thickness: 2px;
  text-decoration-style: solid;
`;

export const Filter = styled.span<{ active: boolean }>`
  margin-right: 12px;
  font-size: 14px;
  cursor: pointer;
  color: ${mainTextColor};

  transition: all 0.1s ease-in-out;

  &:hover {
    color: ${mainColorTheme};
  }

  ${({ active }) => active && activeStyle}
`;

export const HomeProductsContainer = styled.div`
  column-count: 3;
  -moz-column-count: 3;
  -webkit-column-count: 3;
  -moz-column-gap: 30px;
  -webkit-column-gap: 30px;
  column-gap: 30px;

  position: relative;
  z-index: 4;
  height: auto;

  .product__card {
    margin: 20px;
  }
`;
