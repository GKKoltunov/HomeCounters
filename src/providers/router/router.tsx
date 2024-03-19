import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../../layout/Layout";
import { HomePage } from "../../pages/HomePage/HomePage";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { ErorPage } from "../../pages/ErorPage/ErorPage";






export const router = createBrowserRouter(

[
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },

      {
        path: "/login",
        element:  <LoginPage />,
      },
      {
        path: "/*",
        element: <ErorPage />,
      },
    ],
  },
])
