const express =require('express');
const AsyncHandler=require('express-async-handler');
const mongoose=require('mongoose');
const { Restaurant }=require('../Model/Restaurant');
const { Chef }=require('../../Chef/Model/Chef');
const { Recette } = require('../../Recette/Model/Recette');
const axios =require('axios');
const {verfyToken}=require('../midlware/verfyToken')


const router=express.Router();

router.get('/all',verfyToken,AsyncHandler(
    async(req,res)=>{
        const  Restaurants=await Restaurant.find();
        res.status(200).json(Restaurants);
    }
));


router.get('/Chefs/:id',verfyToken, AsyncHandler(
    async (req, res) => {
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.findById(restaurantId).populate('chef_id');
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant Not Found' });
        }
        const chef = restaurant.chef;
        res.status(200).json(chef);
    }
));


router.get('/Recettes/:id',verfyToken, AsyncHandler(
    async (req, res) => {
        const restaurantId = req.params.id;
        try {
            const response = await axios.get(`http://localhost:3002/recettes/${restaurantId}`);
            res.status(200).json(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des recettes:', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des recettes' });
        }
    }
));




router.post('/add',verfyToken,AsyncHandler(
    async(req,res)=>{
        const  newRestaurant= new Restaurant({
            name:req.body.name,
            chef_id:req.body.chef_id,
            recette_id:req.body.recette_id,
        });
        const resulta= await newRestaurant.save();
        res.status(201).json(resulta);
    }
));

router.put('/update/:id',verfyToken,AsyncHandler(
    async(req,res)=>{
        const  newRestaurantUpdate= await Restaurant.findByIdAndUpdate(req.params.id,{
            $set:{
                name:req.body.name,
                chef_id:req.body.chef_id,
                recette_id:req.body.recette_id,
            }
        },
        {
            new: true
        });
        res.status(201).json(newRestaurantUpdate);
    }
));

router.delete('/delete/:id',verfyToken,AsyncHandler(
    async(req,res)=>{
        const  newRestaurantDelete= await Restaurant.findById(req.params.id);
        if(newRestaurantDelete){
            await Restaurant.findByIdAndDelete(req.params.id);
            res.status(200).json({message:'Restaurant Has Deleted'});
        }
        else{
            res.status(404).json({message:'Restaurant Not Found'});
        }
    }
))

module.exports=router;