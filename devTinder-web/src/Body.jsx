import Footer from "./Footer";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;