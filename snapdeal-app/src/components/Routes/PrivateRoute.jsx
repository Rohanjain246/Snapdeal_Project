import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashboardComponent from "../DashboardComponent";
import LoginDialog from "../Login/Login";
import OTPDialog from "../Otp/OtpValidation";
import ProductPage from "../Product/ProductOverview";
import ShoppingCart from "../Product/AddToCartPage";
import CheckoutDialog from "../PaymentMethods/PaymentMethod";
import ProductListingPage from "../Product/Selectedroduct";
import SignUpForm from "../Login/SignUpForm";
import MyOrdersPage from "../Orders/MyOrderDetails";
import AdminPortal from "../Admin/AdminPortal";
import SavedAddresses from "../Orders/AddressDetails/SaveAddressCard";

const route = createBrowserRouter([
  {
    path: "/",
    element: <DashboardComponent />,
    children: [
      {
        path: "myOrder",
        element: <MyOrdersPage />,
      },
      {
        path: "myAddress",
        element: <SavedAddresses />,
      },
      { path: "login", element: <LoginDialog /> },
      { path: "register", element: <SignUpForm /> },
      { path: "otp", element: <OTPDialog /> },
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
      {
        path: "product",
        element: <ProductListingPage />,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminPortal />,
  },
  { path: "*", element: <div>404 Not Found</div> },
]);

const PrivateRoute = () => {
  return <RouterProvider router={route} />;
};

export default PrivateRoute;
