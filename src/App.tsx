import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./providers/router/router"; 
import { CookiesProvider } from "react-cookie";

function App() {
  
  return (
    <>
      <CookiesProvider>
        <RouterProvider router={router} />
      </CookiesProvider>
    </>
  );
}

export default App;
