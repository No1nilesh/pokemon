import "./App.css";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import Pokemon from "./pages/Pokemon.jsx";

function RootLayout() {
  return (
    <div className="text-center font-exo">
      <Header /> 
      <Outlet /> 
    </div>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,  
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/pokemon/:id",
          element: <Pokemon />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
