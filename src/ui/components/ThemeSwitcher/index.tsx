import { Moon, Sun } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { changeTheme } from "../../../app/store/slicers/theme.slicer";
import { ThemeSwitcherContainer } from "./styles";

interface ThemeSwitcherProps {
  width?: string;
  scale?: number;
}

const ThemeSwitcher = ({ width, scale }: ThemeSwitcherProps) => {
  const themeState = useSelector((state: RootState) => state.theme.value);
  const dispatch = useDispatch();

  const handleTheme = () => {
    let newTheme = themeState === "light" ? "dark" : "light";

    dispatch(changeTheme(newTheme));
  };

  return (
    <ThemeSwitcherContainer
      onClick={() => handleTheme()}
      width={width}
      scale={scale}
    >
      {themeState === "light" ? (
        <Moon className="icon" />
      ) : (
        <Sun className="icon" />
      )}
    </ThemeSwitcherContainer>
  );
};

export { ThemeSwitcher };
