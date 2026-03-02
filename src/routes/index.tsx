import { createBrowserRouter } from "react-router";

import PublicLayout from "../layouts/Publiclayout";
import PrivateLayout from "../layouts/Privatelayout";

import SignIn from "../pages/Signin";
import SignUp from "../pages/Signup";
import Dashboard from "../pages/Dashboard";

import { requireGuest, userLoader } from "./loader";
import { signInAction } from "./actions/signin.action";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    loader: requireGuest,
    children: [
      { path: "/signin", element: <SignIn />, action: signInAction },
      { path: "/signup", element: <SignUp /> },
    ],
  },
  {
    id: "private-layout",
    element: <PrivateLayout />,
    loader: userLoader,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },
]);