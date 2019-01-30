import React, { Fragment } from 'react'

// Page
import Page from './Page'

// Styles
import './styles'

const pages = [
  {
    title: 'work',
    images: [1, 2, 3, 4, 5, 6, 7]
  },
  {
    title: 'about',
    images: [8, 10, 9, 11, 1, 2, 12]
  },
  {
    title: 'contact',
    images: [4, 5, 12, 6, 8, 10, 3]
  }
]


const App = () => (
  <Fragment>
    <Page pages={pages} />
  </Fragment>
)

export default App
