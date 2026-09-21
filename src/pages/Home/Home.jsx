import SectionTitle from "../../components/shared/SectionTitle";
import Banner from "./Banner";
import CategoryCollection from "./CategoryCollection";
import FavoriteProducts from "./FavoriteProducts";


const Home = () => {
    return (
        <div>
            <Banner/>
            <CategoryCollection/>
            <SectionTitle heading={"created feavorites"} subheading={"Trading new arrivals"}/>
            <FavoriteProducts/>
            <h1>this</h1>
        </div>
    );
};

export default Home;