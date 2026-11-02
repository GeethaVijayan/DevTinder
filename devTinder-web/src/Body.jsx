import Footer from "./footer";
import NavBar from "./navBar";

import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div>
       <NavBar />
       <Outlet /> 
       <Footer /> 
    </div>
  )
}

export default Body
