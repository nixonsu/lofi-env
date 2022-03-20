import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: ${({ theme }) => theme.colors.primaryTextColor};
    }

    button {
        cursor: pointer;
    }

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background-color: ${({ theme }) => theme.colors.secondaryTextColor};
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.colors.primaryTextColor};
    }
`;

export default GlobalStyles;
