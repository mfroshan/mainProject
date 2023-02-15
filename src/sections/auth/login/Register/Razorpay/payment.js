import Axios from 'axios';

const loadscript = (src) =>{
   return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script);
   }) 
}

export default async function DisplayRazorpay(amt,regFn){
   
    const res = await loadscript('https://checkout.razorpay.com/v1/checkout.js')

    console.log(amt);
    console.log(regFn);
    

    if(!res){
        alert("Your offline!... server error")
    }

    const data = await Axios.post("http://localhost:3001/razorpay",{
        amt:amt,
        headers: {
            // Overwrite Axios's automatically set Content-Type
            'Content-Type': 'application/json'
          }
    }).then((response) => {
    return response.data;
    });
    

    console.log(data);

    const options = {
        key: "rzp_test_5x82urML6UdoaR",
        currency: data.currency,
        amount: data.amt,
        description: "wallet Transaction",
        order_id: data.id,
        handler: async function (response){
            // alert("PAYMENT ID:"+ response.razorpay_payment_id);
            // alert("ORDER_ID:" + response.razorpay_order_id);
            // localStorage.setItem("PaymentID",response.razorpay_payment_id);
            console.log(response);
            regFn(response)
        },
        prefill: {
            name: "Roshan M F",
            email: "roshan@gmail.com",
            contact: 9895459416,
        },
    };
       const paymentObject = new window.Razorpay(options)
       paymentObject.open();
       
    }
