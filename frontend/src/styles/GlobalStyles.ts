import { createGlobalStyle } from "styled-components";
import Unibody from "../fonts/Unibody.otf";

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        background-color: ${({ theme }) => theme.colors.backgroundColor};
        color: ${({ theme }) => theme.colors.primaryTextColor};
        font-family: 'Unibody';
    }

    @font-face {
        font-family: 'Unibody';
        src: url(${Unibody});
        
    }

    .hidden {
        display: none;
    }

    .red {
        color: red;
    }

    .half-opacity {
        opacity: 0.5;
    }

    .full-opacity {
        opacity: 1.0;
    }

    .art {
        max-width: 100%;
        max-height: 100%;
    }
`;

export default GlobalStyles;
