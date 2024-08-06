import React from 'react'
import ReactDOM from 'react-dom/client'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import App from './App.jsx'

import { ThemeProvider } from '@emotion/react'
import theme from './mui/theme.js'

import "./styles/index.css"
import "./styles/fonts.css"
import { BrowserRouter } from 'react-router-dom'


const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHCMS_URI,
  cache: new InMemoryCache()
})



ReactDOM.createRoot(document.getElementById('root')).render(

  <ApolloProvider client={client}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </ApolloProvider>
)
