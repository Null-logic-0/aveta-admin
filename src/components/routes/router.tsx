import { createBrowserRouter } from "react-router";

import AuthRootLayout from "../../pages/auth-root";
import ProtectRoutes from "../guards/ProtectRoutes";
import SignIn from "../../pages/sign-in";
import ForgotPassword from "../../pages/forgot-password";
import ChangePassword from "../../pages/change-password";
import SuccessMessage from "../../pages/success-message";
import Home from "../../pages/home";
import RootLayout from "../../pages/root";
import NotAllowedWarningPage from "../../pages/not-allowed";

export const router = createBrowserRouter([
  {
    element: (
      <ProtectRoutes redirectIfAuthenticated={true}>
        <AuthRootLayout />
      </ProtectRoutes>
    ),
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
    ],
  },

  {
    path: "/warning",
    element: <NotAllowedWarningPage />,
  },
]);
