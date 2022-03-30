import styled from "styled-components";

export const StyledTimer = styled.div`
  display: flex;
  margin-top: 100px;
  margin-right: 10px;
  margin-bottom: 15px;
  gap: 20px;

  /* Phone */
  @media (max-width: 768px) {
    margin-top: 10px;
  }

  /* Tablet */
  @media (max-width: 820px) {
    margin-top: 10px;
  }

  h1 {
    font-size: 50px;
    margin: 0 0 10px 0;
  }
`;
