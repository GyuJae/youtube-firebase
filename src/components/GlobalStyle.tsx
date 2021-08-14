import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    a{
        text-decoration: none;
        color: inherit;
    }
    body {
        font-family: Roboto, Arial, sans-serif;
        background-color: #F9F9F9;
    }
    
    button {
        all: unset;
        border:none;
    }
`;

export default GlobalStyle;
