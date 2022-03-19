import { createGlobalStyle } from "styled-components";
import Unibody from "../fonts/Unibody.otf";

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Unibody';
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
    background-color: lightgrey;
    }

    ::-webkit-scrollbar-thumb {
    background-color: black;
    }
`;

export default GlobalStyles;
