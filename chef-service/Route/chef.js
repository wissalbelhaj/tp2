const express =require('express');
const AsyncHandler=require('express-async-handler');
const mongoose=require('mongoose');
const {Chef }=require('../Model/Chef');
const router=express.Router();
const {verfyToken}=require('../midlware/verfyToken')

router.get('/all',verfyToken,AsyncHandler(
    async(req,res)=>{
        const  Chefs=await Chef.find();
        res.status(200).json(Chefs);
    }
));

router.post('/add',verfyToken,AsyncHandler(
    async(req,res)=>{
        const  newChef= new Chef({
            name:req.body.name,
            specialty:req.body.specialty,
        });
        const resulta= await newChef.save();
        res.status(201).json(resulta);
    }
));

router.put('/update/:id',verfyToken,AsyncHandler(
    async(req,res)=>{
        const  newChefUpdate= await Chef.findByIdAndUpdate(req.params.id,{
            $set:{
                name:req.body.name,
                specialty:req.body.specialty,
            }
        },
        {
            new: true
        });
        res.status(201).json(newChefUpdate);
    }
));

router.delete('/delete/:id',verfyToken,AsyncHandler(
    async(req,res)=>{
        const  newChefDelete= await Chef.findById(req.params.id);
        if(newChefDelete){
            await Chef.findByIdAndDelete(req.params.id);
            res.status(200).json({message:'Chef Has Deleted'});
        }
        else{
            res.status(404).json({message:'Chef Not Found'});
        }
    }
))

module.exports=router;