import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import DataProtectedRoute from "../protectedRoutes/DataProtectedRoute";
import AuthProtectedRoute from "../protectedRoutes/AuthProtectedRoute";
import Profile from "../pages/Profile";
import Header from "../components/Header";

const RenderLayout = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;
  return (
    <>
      {token && <Header />}
      <Outlet />
    </>
  );
};

const AppRoutes = () => {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <RenderLayout />,
      children: [
        {
          path: "",
          element: (
            <DataProtectedRoute>
              <Home />
            </DataProtectedRoute>
          ),
        },
        {
          path: "/login",
          element: (
            <AuthProtectedRoute>
              <Login />
            </AuthProtectedRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <DataProtectedRoute>
              <Profile />
            </DataProtectedRoute>
          ),
        },
        {
          path: "/register",
          element: (
            <AuthProtectedRoute>
              <Register />
            </AuthProtectedRoute>
          ),
        },
        {
          path: "*",
          element: <Navigate to={"/"} />,
        },
      ],
    },
  ]);
  return <RouterProvider router={browserRouter} />;
};

export default AppRoutes;
