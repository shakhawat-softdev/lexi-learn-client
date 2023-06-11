import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Chekout";
import { loadStripe } from "@stripe/stripe-js";
import useSelectedCart from "../../Hooks/useSelectedCart";

//TODO: provide publishable key
const pk = import.meta.env.VITE_PAYMENT_GETWAY_PK;
const stripePromise = loadStripe(pk);

const Payment = () => {
   const [selectedClass, refetch] = useSelectedCart()
   const total = selectedClass?.reduce((accumulator, currentPrice) => accumulator + currentPrice.price, 0)


   return (
      <div>
         <div className="text-center">
            <h2 className="text-4xl font-semibold my-4">Payment</h2>
         </div>
         {/* <h2 className="text-lg font-bold">Total Course Free: ${total}</h2> */}
         <Elements stripe={stripePromise} >
            <Checkout total={total} />
         </Elements>

      </div>
   );
};

export default Payment;