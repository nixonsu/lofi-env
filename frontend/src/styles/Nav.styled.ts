import styled from "styled-components";

export const StyledNav = styled.nav`
  display: flex;
  position: fixed;
  justify-content: flex-end;
  padding-top: 15px;
  padding-right: 15px;
  width: 100%;

  li {
    list-style-type: none;
  }

  ul {
    display: flex;
    gap: 20px;
    padding: 0;
  }
`;
