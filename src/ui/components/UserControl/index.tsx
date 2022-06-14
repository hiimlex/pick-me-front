import { useEffect, useRef, useState } from "react";
import { User } from "react-feather";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeAuthorizationHeaderToken,
  removeAuthToken,
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

  const handleDropdownVisible = () => {
    setDropdown((curr) => !curr);
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
        !(dropDownRef as any).current.contains(event.target)
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
      <UserControlPanel onClick={handleDropdownVisible}>
        <span>@{user.username}</span>
        <User className="icon" />
      </UserControlPanel>
      {dropdown && (
        <DropdownContainer ref={dropDownRef}>
          <DropdownLink>profile</DropdownLink>
          <DropdownLink>favorites</DropdownLink>
          <DropdownLink onClick={handleLogout}>logout</DropdownLink>
        </DropdownContainer>
      )}
    </UserControlContainer>
  );
};

export default UserControl;
