import './App.css'
import CatalogPage from './Pages/CatalogPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ProductPage from './Pages/productPage/ProductPage';

function App() {
  
  
    const router = createBrowserRouter([
      {
        path: "/",
        element: (
          <CatalogPage />
        ),
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
      },
    ]);
    
    return (
     
      <RouterProvider router={router} />
    )

    
}

export default App
