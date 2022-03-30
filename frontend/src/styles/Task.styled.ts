import styled from "styled-components";

export const StyledTask = styled.div`
  display: flex;
  align-items: center;

  h2 {
    font-size: 16px;
    flex: 3;
  }
  button {
    flex: 1;
  }
  .strike-through {
    text-decoration: line-through solid 3px;
  }
`;
