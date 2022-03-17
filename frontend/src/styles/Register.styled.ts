import styled from "styled-components";
import Unibody from "../fonts/Unibody.otf";

export const StyledRegister = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 100%;
  margin: 0;

  * {
    font-family: "Unibody";
  }

  @font-face {
    font-family: "Unibody";
    src: url(${Unibody});
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
  }

  form > input {
    border: 5px solid;
    padding: 8px;
  }

  form > input:focus {
    outline: none;
  }

  form > button {
    border: 5px solid;
    padding: 8px;
  }

  .heading > h1 {
    text-align: center;
  }
`;
