import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home/Home";
import Categories from "../pages/Categories/Categories.jsx";
import Cart from "../pages/Cart/Cart.jsx";
import Offers from "../pages/Offers/Offers.jsx";
import NewArrivals from "../pages/NewArrivals/NewArrivals.jsx";
import Wishlist from "../pages/Wishlist/Wishlist.jsx";
import AuthLayout from "../layout/AuthLayout.jsx";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx";
import Shop from "../pages/Shop/Shop.jsx";
import ProductDetails from "../pages/Shop/ProductDetails.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "/shop",
                element: <Shop/>,
            },
            {
                path: "/categories",
                element: <Categories/>,
            },{
                path:'/product/:id',
                element: <ProductDetails/>
            },
            {
                path: "/offers",
                element: <Offers/>,
            },
            {
                path: "/new-arrivals",
                element: <NewArrivals/>,
            },
            {
                path: "/wishlist",
                element: <Wishlist/>,
            },

            {
                path: "/cart",
                element: <Cart/>,
            }
        ]
    },
    {
        path:"/auth",
        element:<AuthLayout/>,
        errorElement: <NotFound />,
        children: [
            {
                path:"/auth/login",
                element: <Login/>
            },
            {
                path:"/auth/register",
                element: <Register/>
            }
        ]
    }
]);


export default router;