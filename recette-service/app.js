const express =require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const RecettePath=require('./Route/recette');



dotenv.config();

mongoose
    .connect(process.env.URL_MONGOOSE)
    .then(()=>console.log(`Server is Connected A mongodb`))
    .catch((err)=>console.log(`Server Failed A connected `,err));

const app =express();
app.use(express.json());

app.use('/recettes',RecettePath);



const PORT =process.env.PORT || 3002;
app.listen(PORT,()=>console.log(`Server is runing on ${PORT}`));