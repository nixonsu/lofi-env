import { StyledHeader } from "../styles/Header.styled";

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <StyledHeader>
      <div>
        <h1>{title}</h1>
      </div>
    </StyledHeader>
  );
};

export default Header;
