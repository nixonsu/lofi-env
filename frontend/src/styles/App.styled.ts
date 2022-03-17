import styled from "styled-components";

export const StyledApp = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  min-height: 100vh;
  min-width: 100vw;

  /* Phone */
  @media (max-width: 768px) {
    && > .last {
      order: 0;
    }

    && > .first {
      order: -1;
    }

    && > .middle {
      order: 1;
    }
  }

  /* Tablet */
  @media (max-width: 820px) {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;

    && > .last {
      order: 0;
    }

    && > .first {
      order: -1;
    }

    && > .middle {
      order: 1;
    }
  }

  .section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  .slideshow {
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin: 20px;
  }

  .arrow {
    transition: transform 0.1s ease-in-out;
  }

  .arrow:active {
    transform: translate(10px);
  }
`;
