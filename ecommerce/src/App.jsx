import './App.css'
import CatalogPage from './Pages/CatalogPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ProductPage from './Pages/productPage/ProductPage';
import SignIn from './Pages/signIn/SignIn';
import Register from './Pages/logIn/Register';
import Header from './components/header/Header';

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
        path: "/sign-in",
        element:<SignIn />
      },
      {
        path: "/register",
        element:<Register />
      },
      
    ]);
    
    return (
     
      <RouterProvider router={router} />
    )

    
}

export default App
