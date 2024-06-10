import './App.css'
import CatalogPage from './Pages/catalog/CatalogPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ProductPage from './Pages/productPage/ProductPage';
import Login from './Pages/logIn/LogIn';
import Cadastro from './Pages/registro/Cadatro';
import Profile from './Pages/profile/Profile';

function App() {
  
  
    const router = createBrowserRouter([
      {
        path: "/",
        element: 
          <CatalogPage />,
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
      },
      {
        path: "/login",
        element:<Login /> 
      },
      {
        path: "/register",
        element:<Cadastro />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      
    ]);
    
    return (
     
      <RouterProvider router={router} />
    )

    
}

export default App
