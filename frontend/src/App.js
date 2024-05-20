import './App.css';
import Login from './Components/Login';
import { BrowserRouter, Route, Routes,useLocation, useNavigate } from "react-router-dom";
import Main from "./Components/Main";
import HeaderUpper from './Components/HeaderUpper';
import Footer from './Components/Footer';
import { useState } from 'react';
import { useEffect } from 'react';
import AddBlog from './Components/AddBlog';
import SignUp from './Components/SignUp';
import ForgetPass from './Components/ForgetPass';
// import UpdateBlog from './Components/UpdateBlog';
import BlogDetails from './Components/BlogDetails';
import UserProfile from './Components/UserProfile';
import EditUserProfile from './Components/EditUserProfile';
import ResetPass from './Components/ResetPass';
import BlogInfo from './Components/BlogInfo';
// import BlogUpdate from './Components/BlogUpdate';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
// import Increment from './Components/Increment';


const App1=()=>{
  const location=useLocation();
  const navigate=useNavigate();
  const token=localStorage.getItem('token');
  useEffect(()=>{
    if(token){
      navigate('/Main')
    }
  },[])
  const [hideNavBar,setHideNavBar]=useState(false);
  useEffect(()=>{
    if(location.pathname==="/"){
      setHideNavBar(true)
    }
    else if(location.pathname==="/SignUp")
    {
      setHideNavBar(true)
    } 
    else if(location.pathname==="/ForgetPass")
    {
      setHideNavBar(true)
    }
    else if(location.pathname==="/UserProfile")
    {
      setHideNavBar(true)
    }
    else if(location.pathname==="/EditUserProfile")
    {
      setHideNavBar(true)
    }
    else if(location.pathname.startsWith("/ResetPass/"))
    {
      setHideNavBar(true)
    }
    else{
      setHideNavBar(false)
    }
  },[location]);

  return(
    <>
    {!hideNavBar && <HeaderUpper/>}
    <Routes>
        <Route path="/" element={<Login></Login>}/>
        <Route path="/Main" element={<Main></Main>}/>
        <Route path="/AddBlog" element={<AddBlog></AddBlog>}/>
        <Route path="/SignUp" element={<SignUp></SignUp>}/>
        <Route path="/ForgetPass" element={<ForgetPass></ForgetPass>}/>
        <Route path="/ResetPass/:email" element={<ResetPass></ResetPass>}/>
        <Route path="/BlogDetails/:id" element={<BlogDetails></BlogDetails>}/>
        <Route path="/UserProfile" element={<UserProfile></UserProfile>}/>
        <Route path="/EditUserProfile" element={<EditUserProfile></EditUserProfile>}/>
        <Route path="/BlogInfo/:id" element={<BlogInfo></BlogInfo>}/>
        {/* <Route path="/Main" element={<Increment></Increment>}/> */}
    </Routes>
    {!hideNavBar && <Footer/>}
    </>
  )
}

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <App1></App1>
        </BrowserRouter>
      </Provider>
      </>
  );
}

export default App;