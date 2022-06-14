import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../../app/services";
import { RootState } from "../../../app/store";
import Logo from "../Logo";
import ThemeSwitcher from "../ThemeSwitcher";
import UserControl from "../UserControl";
import {
  HeaderContainer,
  HeaderContent,
  HeaderNav,
  HeaderNavLinks,
  SearchInput,
} from "./styles";

const Header = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  const hasToken = (): boolean => {
    const token = getAuthToken();

    return !!token;
  };

  const hasUser = (): boolean => {
    return !!user && user && Object.keys(user).length > 0;
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo size={28} clickable={true} callback={() => navigate("/home")} />
        <SearchInput placeholder="search for a art" />
        <HeaderNav>
          <HeaderNavLinks>
            {hasUser() && <span>show your art</span>}
            {!hasToken() && !hasUser() && (
              <span onClick={() => navigate("/login")}>login</span>
            )}
            {!hasToken() && !hasUser() && (
              <span onClick={() => navigate("/register")}>register</span>
            )}
          </HeaderNavLinks>
          {hasUser() && <UserControl />}
          <ThemeSwitcher />
        </HeaderNav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
