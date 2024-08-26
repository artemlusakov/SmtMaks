import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Error from "./Pages/Error/Error";
import Equipment from './Pages/Equipment/Equipment';
import EquipMC421 from './Pages/Equipment/EquipmentMc421/MC421'

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
    },
    {
        path: "/mc421",
        element: <EquipMC421/>
    }
]);