//policies properties is optional so not mentioned here
// path: ./src/api/restaurant/routes/custom-restaurant.js

module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/orders/pretransaction',
        handler: 'custom.exampleAction',
        
      },
    ],
  };
  