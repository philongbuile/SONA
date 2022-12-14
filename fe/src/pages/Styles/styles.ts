import { createGlobalStyle } from 'styled-components';

export const Styles = createGlobalStyle`

    @font-face {
        font-family: "Roboto";
        src: url("/fonts/Roboto-Regular.ttf") format("truetype");
        font-style: normal;
    }

    @font-face {
        font-family: "Roboto";
        src: url("/fonts/Roboto-Bold.ttf") format("truetype");
        font-style: normal;
    }


    body,
    html,
    a {
        font-family: 'Roboto';
    }


    body {
        margin:0;
        padding:0;
        border: 0;
        outline: 0;
        background: #fff;
        overflow-x: hidden;
    }

    a:hover {
        color: #18216d;
    }

    input,
    textarea {
        border-radius: 4px;
        border: 0;
        background: rgb(129, 114, 213);
        transition: all 0.3s ease-in-out;  
        outline: none;
        width: 100%;  
        padding: 1rem 1.25rem;

        :focus-within {
            background: none;
            box-shadow: #2e186a 0px 0px 0px 1px;
        }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: 'Roboto', serif;
        color: #72c6d5;
        font-size: 56px;
        line-height: 1.18;

        @media only screen and (max-width: 890px) {
          font-size: 36px;
        }
      
        @media only screen and (max-width: 414px) {
          font-size: 32px;
        }
    }

    p {
        color: #18216d;
        font-size: 20px;        
        line-height: 1.41;
    }

    button {
        color: #18216d;
        font-size: 20px;        
        line-height: 1.41;
    }

    h1 {
        font-weight: 700;
    }

    a {
        text-decoration: none;
        outline: none;
        color: #72c6d5;

        :hover {
            color: #72c6d5;
        }
    }
    
    *:focus {
        outline: none;
    }

    .about-block-image svg {
        text-align: center;
    }

    .ant-drawer-body {
        display: flex;
        flex-direction: column;
        text-align: left;
        padding-top: 1.5rem;
    }

    .ant-drawer-content-wrapper {
        width: 300px !important;
    }
`;
