import styled from "styled-components";
import Unibody from "../fonts/Unibody.otf";

export const StyledNav = styled.nav`
  display: flex;
  position: fixed;
  justify-content: flex-end;
  padding-top: 15px;
  padding-right: 15px;
  width: 100%;

  * {
    font-family: "Unibody";
  }

  @font-face {
    font-family: "Unibody";
    src: url(${Unibody});
  }

  li {
    list-style-type: none;
  }

  .word-btn {
    border: 5px solid;
    padding: 8px;
    width: 120px;
  }

  .ul-btn {
    display: flex;
    gap: 50px;
    padding: 0;
  }

  .ul-word-btn {
    display: flex;
    gap: 50px;
    padding: 0;
    margin-right: 50px;
  }
`;
