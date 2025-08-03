import { createBrowserRouter } from "react-router";
import AuthRootLayout from "../../pages/auth-root";
import ProtectRoutes from "../guards/ProtectRoutes";

import Home from "../../pages/home";
import Media from "../../pages/media";
import Blogs from "../../pages/blogs";
import SignIn from "../../pages/sign-in";
import RootLayout from "../../pages/root";
import EditBlog from "../../pages/edit-blog";
import ErrorPage from "../../pages/error-page";
import CreateBlog from "../../pages/create-blog";
import ForgotPassword from "../../pages/forgot-password";
import ChangePassword from "../../pages/change-password";
import SuccessMessage from "../../pages/success-message";
import NotAllowedWarningPage from "../../pages/not-allowed";

export const router = createBrowserRouter([
  {
    element: (
      <ProtectRoutes redirectIfAuthenticated={true}>
        <AuthRootLayout />
      </ProtectRoutes>
    ),
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },

      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/success",
        element: <SuccessMessage />,
      },
      {
        path: "/reset-password",
        element: <ChangePassword />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectRoutes>
        <RootLayout />
      </ProtectRoutes>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/media",
        element: <Media />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/create-blog",
        element: <CreateBlog />,
      },
      {
        path: "/edit-blog/:blogId",
        element: <EditBlog />,
      },
    ],
  },

  {
    path: "/warning",
    element: <NotAllowedWarningPage />,
  },
]);
