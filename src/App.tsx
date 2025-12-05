import { Route, Routes, BrowserRouter } from "react-router-dom"
import Main from "./main/mainpage"
import Protectedroute from "./routes/protectedroute"
import Humanize from "./pages/humanize"
import Signup from "./auth/signup"
import Forgot from "./auth/forgot"
import Login from "./auth/login";
import Mainrenderpage from "./pages/mainrenderpage"
import Aichatbot from "./pages/aichatcode"
import Menu from "./pages/menu";
import Userinfo from "./auth/userinfo"
import Confirm from "./auth/confirmemail"
import Protectedemailverify from "./routes/protectedemailverify"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/signin" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/password" element={<Forgot/>}/>
          <Route path="/confirmemail" element={<Protectedemailverify><Confirm/></Protectedemailverify>}/>
          <Route path="/userinfo" element={<Protectedroute><Userinfo/></Protectedroute>} />
          <Route path="/" element={<Mainrenderpage/>}>

            <Route path="/playground" element={<Protectedroute><Menu/></Protectedroute>} />
            <Route path="/humanize" element={<Protectedroute><Humanize/></Protectedroute>} />
            <Route path="/chatcode" element={<Protectedroute><Aichatbot/></Protectedroute>} />
          </Route>
           <Route path="*" element={<h1 className="text-white">Not Found!</h1>}/>
        </Routes>
       
      </BrowserRouter>
    </>
  )
}

export default App
