import Header from "./Dashboard/Header";
import Footer from "./Dashboard/Footer";
import MainContent from "./Dashboard/MainContent";
import { Outlet } from "react-router-dom";

function DashboardComponent() {
  return (
    <div>
      <Header />
      <MainContent />
      <Outlet />
      <Footer />
    </div>
  );
}

export default DashboardComponent;
