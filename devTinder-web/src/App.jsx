import { BrowserRouter,Routes,Route } from "react-router-dom";
import Body from "./Body";
import Login from "./login";
import Profile from "./profile";


function App() {
 

  return (
    <>
    <BrowserRouter  basename="/">
      <Routes>
          <Route path = "/" element= {<Body/>} /> 
          <Route path = "/login" element= {<Login />} />
          <Route path = "/profile" element= {<Profile />} />
      </Routes>
    </BrowserRouter>
    <div className="min-h-screen bg-gray-700 text-white">
     <h1 className="p-4 text-white">Hello world</h1>
    
    </div>
 

    </>
  )
}

export default App
