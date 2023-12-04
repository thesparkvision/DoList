import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, CSSReset, Box } from '@chakra-ui/react'
import App from './App.tsx'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <CSSReset />
      <Box w='100%'>
        <App />
      </Box>
    </ChakraProvider>
  </React.StrictMode>,
)
