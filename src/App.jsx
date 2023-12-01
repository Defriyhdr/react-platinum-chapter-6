import { routes } from "./routes";
import { useRoutes } from "react-router-dom";

const App = () => {
  let element = useRoutes(routes);
  return element;
};

export default App;
