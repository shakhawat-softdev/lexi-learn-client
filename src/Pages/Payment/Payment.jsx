import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Chekout";
import { loadStripe } from "@stripe/stripe-js";
import useSelectedCart from "../../Hooks/useSelectedCart";
import { useParams } from "react-router-dom";
import Heading from "../../SharedComponsnts/Heading";


//TODO: provide publishable key
const pk = import.meta.env.VITE_PAYMENT_GETWAY_PK;
const stripePromise = loadStripe(pk);

const Payment = () => {
   const [selectedClass, refetch] = useSelectedCart()
   const payClass = useParams();
   // console.log("select cls id", payClass.id)
   const course = selectedClass?.find(item => item._id === payClass.id)
   const total = selectedClass?.reduce((accumulator, currentPrice) => accumulator + currentPrice.price, 0)
   return (
      <div className="m-5">
         <Heading heading={"Payment"} />
         {/* <h2 className="text-lg font-bold">Total Course Free: ${total}</h2> */}
         <Elements stripe={stripePromise} >
            <Checkout total={total} course={course} />
         </Elements>

      </div>
   );
};

export default Payment;