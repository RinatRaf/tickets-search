import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Film from "../pages/Film/Film";



const AppRouter = () => {   

    const routers = createBrowserRouter([
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: "/Film/:filmId",
          element: <Film/>
        },
      ]);

    return (
        <RouterProvider router={routers} />
    )
}



export default AppRouter