// path: ./src/api/restaurant/controllers/restaurant.js

const https = require('https');
const PaytmChecksum = require('paytmchecksum');

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  // Method 1: Creating an entirely custom action
  async exampleAction(ctx) {
    /*
    * import checksum generation utility
    * You can get this utility from https://developer.paytm.com/docs/checksum/
    */

    var paytmParams = {};
    //console.log(ctx.request.body)
    let params=JSON.parse(ctx.request.body)
    //console.log(params)
    // console.log(process.env.MID)
    // console.log(process.env.MKEY)
   
    paytmParams.body = {
      "requestType": "Payment",
      "mid": process.env.MID,
      "websiteName": "WEBSTAGING",
      "orderId": params.orderid,
      "callbackUrl": "http://localhost:1337/api/orders/posttransaction",
      "txnAmount": {
        "value": params.amount,
        "currency": "INR",
      },
      "userInfo": {
        "custId": "CUST_002",
      },
    };
    //console.log("RunMe")
    /*
    * Generate checksum by parameters we have in body
    * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    */
    let checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.MKEY)
    //console.log(checksum)
    paytmParams.head = {
      "signature": checksum
    };
    var post_data = JSON.stringify(paytmParams);
    const gettoken = async () => {
      return new Promise((resolve, rejects) => {
        var options = {

          /* for Staging */
          hostname: 'securegw-stage.paytm.in',

          /* for Production */
          //hostname: 'securegw.paytm.in',
          
          port: 443,
          path: `/theia/api/v1/initiateTransaction?mid=${process.env.MID}&orderId=${params.orderid}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': post_data.length
          }
        };

        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on('data', function (chunk) {
            response += chunk;
          });

          post_res.on('end', function () {
            //console.log('Response: ', response);
            resolve(response);
            //return response
          });
        });

        post_req.write(post_data);
        post_req.end();
      })
    }

    let myr = await gettoken()
    
    ctx.send(JSON.parse(myr))
  },

}));
