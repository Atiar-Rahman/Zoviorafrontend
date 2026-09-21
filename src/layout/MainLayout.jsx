import { Outlet } from "react-router-dom";


const MainLayout = () => {
    return (
        <div>
            <h1>navbar</h1>
            <div><Outlet/></div>
            <h1>footer</h1>
        </div>
    );
};

export default MainLayout;