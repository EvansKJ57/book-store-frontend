import * as styled from 'styled-components';
import 'sanitize.css';
import { ThemeName } from './theme';

interface IProps {
  themeName: ThemeName;
}
export const GlobalStyle = styled.createGlobalStyle<IProps>`
  body {
    padding: 0;
    margin: 0;
    background-color: ${(props) =>
      props.themeName === 'light' ? 'white' : 'black'};
  }
  h1 {
    margin: 0;
  }

  * {
    color: ${(props) => (props.themeName === 'light' ? 'black' : 'white')};
  }
`;
