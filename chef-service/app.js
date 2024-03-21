const express =require('express');
const AsyncHandler=require('express-async-handler');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const ChefPath=require('./Route/chef');

dotenv.config();

mongoose
    .connect(process.env.URL_MONGOOSE)
    .then(()=>console.log(`Server is Connected A mongodb`))
    .catch((err)=>console.log(`Server Failed A connected `,err));

const app =express();
app.use(express.json());

app.use('/Chef',ChefPath);



const PORT =process.env.PORT || 3001;
app.listen(PORT,()=>console.log(`Server is runing on ${PORT}`));