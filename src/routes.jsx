import Home from "./pages/Home";
import NewMenu from "./pages/NewMenu";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/new-menu",
    element: <NewMenu />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/detail/:id",
    element: <Detail />,
  },
  {
    path: "/edit/:id",
    element: <Edit />,
  },
];
