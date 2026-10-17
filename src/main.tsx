import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './app/router/AppRouter/AppRouter'
import UserAuthProvider from './app/providers/UserAuthProvider/UserAuthProvider'
import QueryProvider from './app/providers/QueryProvider/QueryProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
    <UserAuthProvider>
        <RouterProvider router={router} />
    </UserAuthProvider>
    </QueryProvider>
  </StrictMode>
)
