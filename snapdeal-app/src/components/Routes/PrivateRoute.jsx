import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashboardComponent from "../DashboardComponent";
import LoginDialog from "../Login/Login";

const route = createBrowserRouter([
  {
    path: "/",
    element: <DashboardComponent />,
    children: [
      { path: "login", element: <LoginDialog /> },
      { path: "register", element: <LoginDialog /> },
    ],
  },
  { path: "*", element: <div>404 Not Found</div> },
]);

const PrivateRoute = () => {
  return <RouterProvider router={route} />;
};

export default PrivateRoute;
