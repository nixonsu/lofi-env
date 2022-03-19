import { createGlobalStyle } from "styled-components";
import Unibody from "../fonts/Unibody.otf";

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Unibody';
        color: ${({ theme }) => theme.colors.primaryTextColor};
    }

    @font-face {
        font-family: 'Unibody';
        src: url(${Unibody});
        
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
