import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Error from "./Pages/Error/Error";
import Equipment from './Pages/Equipment/Equipment';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        errorElement:<Error/>,
    },
    {
        path: "/Home",
        element: <Home/>,
    },
    {
        path: "/Equipment",
        element: <Equipment/>,  
    }
]);