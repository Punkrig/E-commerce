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
import ShoppingCart from './Pages/shoppingCart/ShoppingCart';
import SellPage from './Pages/sellPage/SellPage';
import TeacherList from './Pages/teacherList/TeacherList';

function App() {
  
  
    const router = createBrowserRouter([
      {
        path: "/",
        element: 
          <CatalogPage />,
      },
      {
        path: "/product/:id",
        element: <ProductPage  />,
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
      {
        path: "/shop-car",
        element: <ShoppingCart  />
      },
      {
        path:"/sell",
        element: <SellPage />
      },
      {
        path:"teacher-list",
        element: <TeacherList/>
      },
    ]);
    
    return (
     
      <RouterProvider router={router} />
    )

    
}

export default App
