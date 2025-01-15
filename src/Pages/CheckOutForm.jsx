import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useOneHr from "../Hooks/useOneHr";
import { AuthContext } from "../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import useIsAdmin from "../Hooks/useIsAdmin";



const CheckOutForm = () => {
const stripe =useStripe()
const elements =useElements()
const [error ,setError]=useState('')
const [client ,setClient]=useState('')
// const [member ,setMember]=useState(0)
const axiosSecure =useAxiosSecure()
const [oneHr]=useOneHr()
const {user} =useContext(AuthContext)
const [ , ,refetch]=useIsAdmin()
const navigate =useNavigate()
const dollarMony=oneHr?.pack
useEffect(()=>{ 
const dollar=oneHr?.pack

if(dollar>0){
  console.log(typeof(dollar))
  axiosSecure.post('/create-payment-intent', {price :dollar})
  .then(res=>{
   console.log(res.data?.clientSecret)
   setClient(res.data?.clientSecret)
  }
  )
}

},[axiosSecure ,oneHr?.pack])


// useEffect(()=>{
// const packageMoney =oneHr?.pack
// if(packageMoney <0){
//   return console.log("package is 0" , packageMoney);
// }
// if(packageMoney==5){
//  return setMember(5)
// }
// if(packageMoney==8){
//   return setMember(10)
// }
// if(packageMoney==15){
//   return setMember(20)
// }
// },[oneHr?.pack])

const handleSubmit=async(e)=>{
    e.preventDefault();
    if (!stripe || !elements) {
        return;
      }

      const card = elements.getElement(CardElement);
  
      if (card == null) {
        return;
      }

   const {error,paymentMethod} =await stripe.createPaymentMethod({
    type:"card",
    card
   })   

   if(error){
    setError(error.message)
   }
   else{
    setError('')
    console.log(paymentMethod);
   }


   const {paymentIntent,error:confirmErr} =await stripe.confirmCardPayment(client,{
    payment_method:{
      card:card,
      billing_details:{
        email:user?.email || 'anonymous',
        name:user?.displayName || 'anonymous'
      }
    }
   })

   if(confirmErr){
    console.log("conform err" ,confirmErr);
   }
   else{
    axiosSecure.patch(`/hrRoleUpdate/${user?.email}`)
    .then(()=>{
      refetch()
 navigate('/')
    })
   console.log("payment intent",paymentIntent);
   }
}

    return (
        <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '20px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="btn btn-sm btn-success my-6" type="submit" disabled={!stripe || !client ||dollarMony<0}>
        Pay
      </button>
      <p className="text-sm text-red-600 font-semibold">{error}</p>
    </form>
    );
};

export default CheckOutForm;