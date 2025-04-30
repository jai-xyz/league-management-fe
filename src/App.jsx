import React from 'react'
import { QueryClient, QueryClientProvider  } from '@tanstack/react-query'
import {BrowserRouter} from 'react-router-dom'
import RoutesComponents from './routes/routesComponents'
function App() {

const queryClient = new QueryClient()

  return (
    <BrowserRouter>
     <QueryClientProvider client={queryClient}>
        <RoutesComponents/>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
