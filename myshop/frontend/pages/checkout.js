import React, { useEffect,useRef, useState } from 'react'
import Script from 'next/script';

const checkout = ({ cart }) => {
  const [SubTotal, setSubTotal] = useState(0);
  const [form, setform] = useState({ name: "", email: "", address: "", phone: "" })

  const isMounted=useRef(false)
  
  let myTotal = 0
  useEffect(() => {
    if (isMounted.current===true){
      return
    }
    for (let index = 0; index < (cart.length); index++) {
      myTotal += cart[index][1]
      // console.log("---"+myTotal,"---"+cart.length)
    }
    setSubTotal(myTotal) 
    isMounted.current=true
  }, [])

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const submit = async () => {
    

    let oid=Math.floor(100000000*Math.random())
     oid=oid.toString()
    let url = "http://localhost:1337/api/orders/pretransaction"
    const rawResponse = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ orderid: oid, amount: SubTotal, ...form, cart:cart})
    });
    const content = await rawResponse.json()
    //console.log(typeof(content.body.txnToken))


    var config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
        "orderId": oid, /* update order id */
        "token": content.body.txnToken, /* update token value */
        "tokenType": "TXN_TOKEN",
        "amount": SubTotal /* SubTotal update amount */
      },
      "handler": {
        "notifyMerchant": function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        }
      }
    };
    // console.log("Check Here"+SubTotal)
    if (window.Paytm && window.Paytm.CheckoutJS) {

      window.Paytm.CheckoutJS.init(config).then(function onSuccess() {

        window.Paytm.CheckoutJS.invoke();
      }).catch(function onError(error) {
        //console.log("error IS HERE => ", error);

      });
    }
  }


  return (
    <div>
      <Script type="application/javascript" crossorigin="anonymous" src={`https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_MID}.js`}> </Script>

      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto min-h-screen">
          <div className="flex flex-col w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Checkout</h1>
            <h2 className="text-xl font-bold text-black pb-1 ">Cart</h2>
            <div className="cart">{cart.length ? <span>Your Cart Details</span> : <span>Your cart is Empty!</span>}</div>
            <ul className='px-8'>
              {
                cart.map((item, data) => (
                  <li key={data} className="list-decimal">
                    Product {`${item[0]} with a price of ₹${item[1]}`}
                  </li>)
                )
              }
            </ul>
            <span className="font-medium text-black">Subtotal:{SubTotal}</span>
          </div>
          <div className=" ">
            <div className="flex flex-wrap">
              <div className="p-2 w-full sm:w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                  <input onChange={handleChange} value={form.name} type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" spellCheck="false" data-ms-editor="true" />
                </div>
              </div>
              <div className="p-2 w-full sm:w-1/2">
                <div className="relative">
                  <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                  <input onChange={handleChange} value={form.email} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-full sm:w-1/2">
                <div className="relative">
                  <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                  <input onChange={handleChange} value={form.phone} type="number" id="phone" name="phone" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>

              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                  <textarea onChange={handleChange} value={form.address} id="address" name="address" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" spellCheck="false" data-ms-editor="true"></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button onClick={submit} className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Pay Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default checkout