import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useSelectedCart from "../../Hooks/useSelectedCart";
import { useQuery } from "@tanstack/react-query";



const Checkout = ({ total, course }) => {
   // console.log(total)
   const { user } = useAuth()
   const stripe = useStripe();
   const elements = useElements();
   const [cardError, setCardError] = useState('');
   const [processing, setProcessing] = useState(false);
   const [transectionId, setTransectionId] = useState('')
   const [axiosSecure] = useAxiosSecure();
   const [clientSecret, setClientSecret] = useState('');
   const [, refetch] = useSelectedCart();



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
         // Swal.fire({ position: 'center', icon: 'success', title: 'Payment Successfull!!', showConfirmButton: false, timer: 1500 });
         //TODO: next step
         const paymentHistory = {
            user: user?.email,
            transectionId: paymentIntent?.id,
            totalprice: course.price,
            date: new Date(),
            coureseName: course.className,
            instructorName: course.instructorName,
            courseId: course._id,
            orderStatus: "Paid",
         };

         console.log(paymentHistory)


         axiosSecure.post('/payments', { paymentHistory })
            .then(res => {
               console.log(res.data)
               if (res.data.insertedId) {
                  //Display Confarm

                  fetch(`http://localhost:5000/selectedClass/${course._id}`, {
                     method: 'DELETE',
                  })
                     .then(res => res.json())
                     .then(data => {
                        console.log(data);

                        if (data.deletedCount > 0) {
                           refetch();
                           // Swal.fire('Remove', 'Course has been Remove from slected class.', 'success')
                        }
                     });
               }
            });

         axiosSecure.post('/enrolled', { course })
            .then(res => {
               console.log(res.data)
               if (res.data.insertedId) {
                  //Display Confarm
                  Swal.fire('Enroll', 'Course has been Enrolled successfully!.', 'Wellcome!')
               }
            });

         document.getElementById("pament-course-form").reset();

      }

   };

   return (
      <div className="flex flex-col justify-center items-center m-5">
         <div className="bg-slate-50 border-2 border-t-emerald-200 p-4 m-5 w-full">
            <h2 className=" text-lg ml-7 mt-5">Course Price: ${course?.price || 0}</h2>
            <form className="w-2/3 m-8" onSubmit={handleSubmit} id="pament-course-form">
               <CardElement
                  options={{ style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4', }, }, invalid: { color: '#9e2146', }, }, }}
               />
               <button className="btn btn-outline btn-primary btn-sm my-5" type="submit" disabled={!stripe || !clientSecret || processing}>
                  Pay
               </button>
            </form>
            {cardError && <p className="red-600 ml-8">{cardError}!</p>}
            {transectionId && <p className="ml-8 font-semibold">Your Payment Is successfull! <br />
               transection Id: {transectionId}!</p>}
         </div>
      </div>
   );
};

export default Checkout;