import ExtraBanner from "../ExtraBanner";
import JoinOurProgram from "../JoinOurProgram/JoinOurProgram";

import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstuctors from "../PopularInstuctors/PopularInstuctors";
import Slider from "../Slider";

const Home = () => {
   return (
      <div>
         <Slider />
         <PopularClasses />
         <PopularInstuctors />
         <JoinOurProgram />
         <ExtraBanner />
      </div>
   );
};

export default Home;