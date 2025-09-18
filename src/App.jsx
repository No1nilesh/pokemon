import "./App.css";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import Pokemon from "./pages/Pokemon/index.jsx";
import Loader from './components/Loader.jsx'
import { useEffect, useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

function RootLayout() {
  return (
    <ErrorBoundary>
      <div className="text-center font-exo">
        <Header />
        <Outlet />
      </div>
    </ErrorBoundary>
  );
}


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setLoading(false)
    }, 2000);

    return () => clearTimeout(id);
  }, [])

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
          path: "/pokemon/:id/:tab",
          element: <Pokemon />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  if (loading) {
    return <Loader />;
  }

  return (
    <RouterProvider router={router} />
  );
}

export default App;
