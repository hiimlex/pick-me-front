import styled from "styled-components";
import {
  backgroundColorTheme,
  mainColorTheme,
  mainTextColor,
} from "../../styles/theme";

export const HeaderContainer = styled.header`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 80px;
  border-bottom: 1px solid ${mainColorTheme}33;

  padding: 0 64px;

  @media (max-width: 768px) {
    padding: 0 32px;
  }
`;

export const HeaderContent = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  position: relative;
`;

export const SearchInput = styled.input`
  height: 42px;
  border-radius: 32px;
  border: 1px solid ${mainTextColor}33;
  min-width: 220px;
  width: 25%;
  max-width: 420px;
  font-size: 14px;
  font-weight: 500;
  color: ${mainTextColor};
  background: ${backgroundColorTheme};
  text-align: center;

  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
`;

export const HeaderNav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const HeaderNavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  * {
    margin: 0 24px;
  }

  span {
    font-size: 14px;
    font-weight: 500;
    color: ${mainColorTheme};
    cursor: pointer;
  }
`;
