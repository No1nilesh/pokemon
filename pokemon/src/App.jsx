import "./App.css"
import Header from "./components/Header.jsx/index.jsx";
import Home from "./pages/Home.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import NotFound from "./pages/NotFound.jsx"
import Pokemon from "./pages/Pokemon.jsx";
function App() {

  const router = createBrowserRouter([
    {
      path : "/",
      element: <Home/>
    },
    {
      path : "/pokemon/:id",
      element : <Pokemon/>
    },
    {
      path : "*",
      element : <NotFound/>
    }
  ])

  return (
    <div className={`text-center font-exo`}>
      <Header/>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
