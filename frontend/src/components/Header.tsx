import { StyledHeader } from "../styles/Header.styled";

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <StyledHeader>
      <h1>{title}</h1>
    </StyledHeader>
  );
};

export default Header;
