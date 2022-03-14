import styled from "styled-components";

export const ImageContainer = styled.div`
  border: 10px solid;
  width: 80%;
  flex: 1;

  /* Tablet */
  @media (max-width: 820px) {
    flex: 1;
  }

  img {
    display: block;
  }
`;
