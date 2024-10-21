import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
// import Navbar from "./components/shared/Navbar"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import Jobs from "./components/Jobs.jsx";
import Browse from "./components/Browse.jsx";
import Profile from "./components/Profile.jsx";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies.jsx";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from './components/admin/AdminJobs';
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import ProtectedUserRoute from "./components/ProtectedUserRoute";

const appRouter = createBrowserRouter([
  ///// client/user side ke liye hai ye
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element:<ProtectedUserRoute><Jobs /></ProtectedUserRoute> ,
  },
  {
    path: "/browse",
    element:<ProtectedUserRoute><Browse /></ProtectedUserRoute> ,
  },
  {
    path: "/profile",
    element:<ProtectedUserRoute><Profile /></ProtectedUserRoute> ,
  },
  {
    path: "/description/:id",
    element:<ProtectedUserRoute><JobDescription /></ProtectedUserRoute> ,
  },

  /////////////////// admin ke liye yaha se hai ///////////////////////////////////////////

  {
    path:"/admin/companies",
    element:<ProtectedAdminRoute><Companies/></ProtectedAdminRoute>
  },

  {
    path:"/admin/companies/create",
    element:<ProtectedAdminRoute><CompanyCreate/></ProtectedAdminRoute>
  },

  {
    path:"/admin/companies/:id",
    element:<ProtectedAdminRoute><CompanySetup/></ProtectedAdminRoute>
  },

  {
    path:"/admin/jobs",
    element:<ProtectedAdminRoute><AdminJobs/></ProtectedAdminRoute>
  },

  {
    path:"/admin/jobs/create",
    element:<ProtectedAdminRoute><PostJob/></ProtectedAdminRoute>
  },
 
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedAdminRoute><Applicants/></ProtectedAdminRoute>
  },
 

]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
