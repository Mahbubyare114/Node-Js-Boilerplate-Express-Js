
index file

const express = require('express');
const app = express();
const port = 4000;

/* const authRoute = require('./Routes/v1/auth.route');
const userRoute = require('./Routes/v1/user.route');
const customerRoute = require('./Routes/v1/customer.route');

// create an array routerPaths to simplify the code of paths
let myRouterPaths = [
    {
        path: '/auth',
        route: authRoute
    },  
    {
        path: '/user',
        route: userRoute
    },
    {
        path: '/customer',
        route: customerRoute  
    }  

];

// app.use('/auth', authRoute); app.use('/user', userRoute); app.use('/customer', customerRoute);
// instead of app.use > path > route use this:
myRouterPaths.forEach(route=>{
    app.use(route.path, route.route)
})
*/

app.listen(port, () =>{
 console.log(`app is listening on localhost: ${port}`);
});