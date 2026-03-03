import { createBrowserRouter } from "react-router";

import PublicLayout from "../layouts/Publiclayout";
import PrivateLayout from "../layouts/Privatelayout";

import SignIn from "../pages/Signin";
import SignUp from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import ChangePassword from "../pages/changepassword"
import { requireGuest, userLoader } from "./loader";
import { signInAction } from "./actions/signin.action";
import { signUpAction } from "./actions/signup.action";
 
import VerifyEmail from "../pages/VerifyEmail";
export const router = createBrowserRouter([
  {
    path: "/verify-email/:token",
    element: <VerifyEmail />,
  },
  {
    element: <PublicLayout />,
    loader: requireGuest,
    children: [
      { path: "/signin", element: <SignIn />, action: signInAction },
      { path: "/signup", element: <SignUp />,action:signUpAction },
    ],
  },
  {
    id: "private-layout",
    element: <PrivateLayout />,
    loader: userLoader,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/change-password", element: <ChangePassword /> },
    ],
  },
]);