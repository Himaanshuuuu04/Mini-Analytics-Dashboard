import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
];

export default routes;
