import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashboardComponent from "../DashboardComponent";
import LoginDialog from "../Login/Login";
import OTPDialog from "../Otp/OtpValidation";
import ProductPage from "../Product/ProductOverview";
import ShoppingCart from "../Product/AddToCartPage";
import CheckoutDialog from "../PaymentMethods/PaymentMethod";

const route = createBrowserRouter([
  {
    path: "/",
    element: <DashboardComponent />,
    children: [
      { path: "login", element: <LoginDialog /> },
      { path: "register", element: <LoginDialog /> },
      { path: "/otp", element: <OTPDialog /> },
      {
        path: "/product/:name/:id",
        element: <ProductPage />,
      },
      {
        path: "cart",
        element: <ShoppingCart />,
      },
      {
        path: "payment",
        element: <CheckoutDialog />,
      },
    ],
  },
  { path: "*", element: <div>404 Not Found</div> },
]);

const PrivateRoute = () => {
  return <RouterProvider router={route} />;
};

export default PrivateRoute;
