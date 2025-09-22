import Header from "./Dashboard/Header";
import Footer from "./Dashboard/Footer";
import MainContent from "./Dashboard/MainContent";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function DashboardComponent() {
  const location = useLocation();

  return (
    <div>
      <Header />
      {!location.pathname.includes("product") &&
        !location.pathname.includes("myAddress") &&
        !location.pathname.includes("myOrder") && <MainContent />}
      <Outlet />
      <Footer />
    </div>
  );
}

export default DashboardComponent;
