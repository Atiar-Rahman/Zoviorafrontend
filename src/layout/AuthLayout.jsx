import { Outlet } from "react-router-dom";



const AuthLayout = () => {
    return (
        <div className="container mx-auto">

            <div><Outlet/></div>

        </div>
    );
};

export default AuthLayout;