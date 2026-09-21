import PhilosophySection from "../../components/Home/PhilosophySection";
import Subcribed from "../../components/Home/Subcribed";
import SectionTitle from "../../components/shared/SectionTitle";
import Banner from "./Banner";
import CategoryCollection from "./CategoryCollection";
import FavoriteProducts from "./FavoriteProducts";


const Home = () => {
    return (
        <div>
            <Banner/>
            <CategoryCollection/>
            {/*<SectionTitle heading={"created feavorites"} subheading={"Trading new arrivals"}/>*/}
            <FavoriteProducts/>
            <PhilosophySection/>
            <Subcribed/>
        </div>
    );
};

export default Home;