import styled from "styled-components";

export const StyledAddTask = styled.form`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 20px 0;

  input {
    flex: 1;
    font-size: 16px;
    border: 0;
    padding: 10px 0px;
    background-color: transparent;
    border-bottom: 1px solid;

    &:focus {
      outline: none;
    }
  }
`;
