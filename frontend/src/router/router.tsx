import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout/MainLayout";
import HomePage from "../pages/homePage/HomePage";
import BoardsPage from "../pages/BoardsPage/BoardsPage";

export const router = createBrowserRouter([
    {
        path:"/", element:<MainLayout/>, children:
            [
                {path:"board/:hashId", element:<HomePage/>},
                {index: true, element:<BoardsPage/>}
            ]
    }
])