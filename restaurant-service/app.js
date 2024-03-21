const express =require('express');
const AsyncHandler=require('express-async-handler');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const RestaurantPath=require('./Route/restaurant');

dotenv.config();

mongoose
    .connect(process.env.URL_MONGOOSE)
    .then(()=>console.log(`Server is Connected A mongodb`))
    .catch((err)=>console.log(`Server Failed A connected `,err));

const app =express();
app.use(express.json());

app.use('/restaurant',RestaurantPath);



const PORT =process.env.PORT || 4000;
app.listen(PORT,()=>console.log(`Server is runing on ${PORT}`));