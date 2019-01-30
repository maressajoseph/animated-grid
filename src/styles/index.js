// @flow
import { injectGlobal } from 'styled-components'
import styledNormalize from 'styled-normalize'

import { fonts } from './fonts'

injectGlobal`
  ${styledNormalize}
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color: #232323;
    color: white;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: ${fonts.primary};
    font-size: 60px;
  }

  #root {
    width: 100%;
    height: 100%;
  }
`
