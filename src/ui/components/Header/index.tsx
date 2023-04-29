import { getAuthToken } from "app/services";
import { AppDispatch, RootState, setFilters } from "app/store";
import { ChangeEvent, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Logo } from "../Logo";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { UserControl } from "../UserControl";
import {
  HeaderContainer,
  HeaderContent,
  HeaderNav,
  HeaderNavLink,
  HeaderNavLinks,
  SearchInput,
} from "./styles";

const Header = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const hasToken = useMemo((): boolean => {
    const token = getAuthToken();

    return !!token;
  }, []);

  const hasUser = useMemo((): boolean => {
    return !!user && user && Object.keys(user).length > 0;
  }, [user]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ name: e.target.value }));
  };

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <Logo size={28} clickable={true} callback={() => navigate("/home")} />
          <SearchInput
            placeholder="search for an art"
            onChange={handleSearchChange}
          />
          <HeaderNav>
            <HeaderNavLinks>
              {hasUser && <HeaderNavLink>show your art</HeaderNavLink>}

              {!hasToken && !hasUser && (
                <HeaderNavLink onClick={() => navigate("/login")}>
                  login
                </HeaderNavLink>
              )}

              {!hasToken && !hasUser && (
                <HeaderNavLink onClick={() => navigate("/register")}>
                  register
                </HeaderNavLink>
              )}
            </HeaderNavLinks>
            {hasUser && <UserControl />}
            <ThemeSwitcher />
          </HeaderNav>
        </HeaderContent>
      </HeaderContainer>
    </>
  );
};

export { Header };
