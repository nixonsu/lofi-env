import styled from "styled-components";

export const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 90vh;
  width: 100%;
  margin: 0;

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
