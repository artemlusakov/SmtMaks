import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Main from './Pages/Main/Main.tsx'
import Equipment from './Pages/Equipment/Equipment.tsx'

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
  },
  {
    path: "/MC421",
    element: <Equipment/>,
  }
]);

createRoot(document.getElementById('root')!).render(

    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>

)
