import JoinOurProgram from "../JoinOurProgram/JoinOurProgram";
import MainSlideBanner from "../MainSlideBanner";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstuctors from "../PopularInstuctors/PopularInstuctors";

const Home = () => {
   return (
      <div>
         <MainSlideBanner />
         <PopularClasses />
         <PopularInstuctors />
         <JoinOurProgram />
      </div>
   );
};

export default Home;