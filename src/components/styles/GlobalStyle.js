import { createGlobalStyle } from "styled-components";
import { themes } from "./ColorStyles";

export const GlobalStyle = createGlobalStyle`
body {
    background: "#f5f5f5";

    @media (prefers-color-scheme: dark) {
        background: "#f5f5f5";
    }
}

`;
