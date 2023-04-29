import { getAuthToken } from "app/services";
import { AppDispatch, RootState, setFilters } from "app/store";
import { ChangeEvent, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Logo } from "../Logo";
import { ShareModal } from "../ShareModal";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { UserControl } from "../UserControl";
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
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const hasToken = useMemo((): boolean => {
    const token = getAuthToken();

    return !!token;
  }, []);

  const hasUser = useMemo((): boolean => {
    return !!user && user && Object.keys(user).length > 0;
  }, [user]);

  const handleShowShareModal = () => {
    setShowModal(true);
  };

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
              {hasUser && (
                <span onClick={() => handleShowShareModal()}>
                  show your art
                </span>
              )}
              {!hasToken && !hasUser && (
                <span onClick={() => navigate("/login")}>login</span>
              )}
              {!hasToken && !hasUser && (
                <span onClick={() => navigate("/register")}>register</span>
              )}
            </HeaderNavLinks>
            {hasUser && <UserControl />}
            <ThemeSwitcher />
          </HeaderNav>
        </HeaderContent>
      </HeaderContainer>
      {showModal && <ShareModal hideModal={setShowModal} />}
    </>
  );
};

export { Header };
