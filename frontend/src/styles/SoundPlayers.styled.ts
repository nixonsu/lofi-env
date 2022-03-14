import styled from "styled-components";

export const StyledSoundPlayers = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px;
  place-items: center;
  grid-gap: 20px;

  /* Phone */
  @media (max-width: 768px) {
    margin-left: 20px;
    margin-top: 10px;
  }

  /* Tablet */
  @media (max-width: 820px) {
    flex: 1;
  }
`;
