import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { AppRoutes } from './Routes'

export const App: React.FC = () => {

  return (
    <ChakraProvider>
      <AppRoutes />
    </ChakraProvider>
  )
}

export default App
