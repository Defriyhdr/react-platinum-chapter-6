import Home from "./pages/Home";
import NewMenu from "./pages/NewMenu";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import ProtectedRoute from "./hoc/ProtectedRoute";
import AuthRoute from "./hoc/AuthRoute";

export const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/new-menu",
    element: (
      <ProtectedRoute>
        <NewMenu />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
  },
  {
    path: "/detail/:id",
    element: (
      <ProtectedRoute>
        <Detail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit/:id",
    element: (
      <ProtectedRoute>
        <Edit />
      </ProtectedRoute>
    ),
  },
];
