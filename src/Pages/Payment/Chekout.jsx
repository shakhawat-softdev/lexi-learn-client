import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useSelectedCart from "../../Hooks/useSelectedCart";


const Checkout = ({ total }) => {
   // console.log(total)
   const { user } = useAuth()
   const stripe = useStripe();
   const elements = useElements();
   const [cardError, setCardError] = useState('');
   const [processing, setProcessing] = useState(false);
   const [transectionId, setTransectionId] = useState('')

   const [axiosSecure] = useAxiosSecure();
   const [clientSecret, setClientSecret] = useState('');
   const [selectedClass, refetch] = useSelectedCart()

   // console.log("Enrolled Class", selectedClass)

   useEffect(() => {
      if (total > 0) {
         axiosSecure.post('/create-payment-intent', { total })
            .then(responce => {
               setClientSecret(responce.data.clientSecret);
            })
      }

   }, [total, axiosSecure]);

   const handleSubmit = async (event) => {
      event.preventDefault()

      if (!stripe || !elements) {
         return
      }
      const card = elements.getElement(CardElement);

      // console.log("Card: ", card);

      if (card === null) {
         return
      }
      setProcessing(true);
      const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card })
      if (error) {
         console.log("error", error);
         setCardError(error.message)
      }
      else {
         setCardError('');
         console.log("paymentMethod", paymentMethod);
      }

      const { paymentIntent, error: confarmError } = await stripe.confirmCardPayment(clientSecret,
         {
            payment_method: {
               card: card,
               billing_details: {
                  email: user?.email || 'unknown',
                  name: user?.displayName || 'anonymous',
               },
            },
         },
      );
      if (confarmError) {
         console.log(confarmError);
      }
      console.log("Payment Intent: ", paymentIntent);
      setProcessing(false)

      if (paymentIntent.status === "succeeded") {
         setTransectionId(paymentIntent.id)
         Swal.fire({ position: 'center', icon: 'success', title: 'Payment Successfull!!', showConfirmButton: false, timer: 1500 });
         //TODO: next step
         const paymentHistory = {
            user: user?.email,
            transectionId: paymentIntent.id,
            totalprice: total,
            date: new Date(),
            coureseName: selectedClass.map(item => item.className),
            instructorName: selectedClass.map(item => item.instructorName),
            courseId: selectedClass.map(item => item._id),
            orderStatus: "Paid",
         }

         axiosSecure.post('/payments', { selectedClass, paymentHistory })
            .then(res => {
               console.log(res.data)
               if (res.data.insertedId) {
                  //Display Confarm

               }
            })
      }

   };

   return (
      <>
         <form className="w-2/3 m-8" onSubmit={handleSubmit}>
            <CardElement
               options={{ style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4', }, }, invalid: { color: '#9e2146', }, }, }}
            />
            <button className="btn btn-outline btn-primary btn-sm my-5" type="submit" disabled={!stripe || !clientSecret || processing}>
               Pay
            </button>
         </form>
         {cardError && <p className="red-600 ml-8">{cardError}!</p>}
         {transectionId && <p className="text-blue-700 ml-8">Transection Compelete with transection Id: {transectionId}!</p>}
      </>
   );
};

export default Checkout;