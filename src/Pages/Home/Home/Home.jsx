import MainSlideBanner from "../MainSlideBanner";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstuctors from "../PopularInstuctors/PopularInstuctors";

const Home = () => {
   return (
      <div>
         <MainSlideBanner />
         <PopularClasses />
         <PopularInstuctors />
         <div className="text-center">
            <h2 className="text-4xl font-semibold">Extra Section <span className="text-yellow-500">ToDo</span> </h2>
         </div>
      </div>
   );
};

export default Home;