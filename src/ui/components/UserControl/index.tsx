import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeAuthToken,
  removeAuthorizationHeaderToken,
} from "../../../app/services";
import { RootState } from "../../../app/store";
import { removeUserState } from "../../../app/store/slicers";
import {
  DropdownContainer,
  DropdownLink,
  UserControlContainer,
  UserControlPanel,
} from "./styles";

const UserControl = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const [dropdown, setDropdown] = useState(false);

  const dropDownRef = useRef(null);
  const triggerRef = useRef(null);

  const handleDropdownVisible = () => {
    setDropdown((curr) => !curr);
  };

  const handleNavigateToProfile = () => {
    navigate(`/profile/${user.id}`);
  };

  const handleLogout = () => {
    dispatch(removeUserState());
    removeAuthToken();
    removeAuthorizationHeaderToken();
    setDropdown(false);
    navigate("/home");
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        dropDownRef.current &&
        !(dropDownRef as any).current.contains(event.target) &&
        triggerRef.current &&
        !(triggerRef as any).current.contains(event.target)
      ) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownRef]);

  return (
    <UserControlContainer>
      <UserControlPanel ref={triggerRef} onClick={handleDropdownVisible}>
        <span>@{user.username}</span>
      </UserControlPanel>
      {dropdown && (
        <DropdownContainer ref={dropDownRef}>
          <DropdownLink onClick={() => handleNavigateToProfile()}>
            profile
          </DropdownLink>
          <DropdownLink>favorites</DropdownLink>
          <DropdownLink onClick={() => handleLogout()}>logout</DropdownLink>
        </DropdownContainer>
      )}
    </UserControlContainer>
  );
};

export { UserControl };
