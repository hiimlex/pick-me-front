import { LogoContent } from "./styles";

interface LogoProps {
  clickable?: boolean;
  callback?: () => void;
  size?: number;
}

const Logo = ({ clickable = false, callback, size = 32 }: LogoProps) => {
  const handleOnClick = () => {
    if (clickable && callback) {
      callback();
    }
  };

  return (
    <LogoContent
      onClick={handleOnClick}
      fontSize={size + "px"}
      clickable={clickable}
    >
      <b>pick</b>.me
    </LogoContent>
  );
};

export { Logo };
