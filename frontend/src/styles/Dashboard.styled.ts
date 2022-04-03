import styled from "styled-components";

export const StyledDashboard = styled.div`
  * {
    background-color: ${({ theme }) => theme.colors.backgroundColor};
    color: ${({ theme }) => theme.colors.primaryTextColor};
  }

  .hidden {
    display: none;
  }

  .red {
    color: #990000;
  }

  .half-opacity {
    fill-opacity: 0.5;
  }

  .full-opacity {
    fill-opacity: 1;
  }

  .art {
    max-width: 100%;
    max-height: 100%;
  }
`;
