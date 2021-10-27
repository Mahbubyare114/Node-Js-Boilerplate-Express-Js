const express = require('express');
const router = express.Router();

const authRoute = require('./auth.route');
const userRoute = require('./user.route');


// create an array routerPaths to simplify the code of paths
let myRouterPaths = [
    {
        path: '/auth',
        route: authRoute
    },  
    {
        path: '/user',
        route: userRoute
    }

];

// app.use('/auth', authRoute); 
// app.use('/user', userRoute);
// instead of app.use > path > route use this:
myRouterPaths.forEach(route=>{
    router.use(route.path, route.route)
})

module.exports = router;