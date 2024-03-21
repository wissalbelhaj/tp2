const express =require('express');
const AsyncHandler=require('express-async-handler');
const mongoose=require('mongoose');
const { Recette }=require('../Model/Recette');
const router=express.Router();
const {verfyToken}=require('../midlware/verfyToken')

router.get('/all',verfyToken,AsyncHandler(
    async(req,res)=>{
        const  Recettes=await Recette.find();
        res.status(200).json(Recettes);
    }
));


router.post('/add',verfyToken,AsyncHandler(
    async(req,res)=>{
        const  newRecette= new Recette({
            libelle:req.body.libelle,
        });
        const resulta= await newRecette.save();
        res.status(201).json(resulta);
    }
));

router.put('/update/:id',verfyToken,AsyncHandler(
    async(req,res)=>{
        const  newRecetteUpdate= await Recette.findByIdAndUpdate(req.params.id,{
            $set:{
                libelle:req.body.libelle,
            }
        },
        {
            new: true
        });
        res.status(201).json(newRecetteUpdate);
    }
));

router.delete('/delete/:id',verfyToken,AsyncHandler(
    async(req,res)=>{
        const  newRecetteDelete= await Recette.findById(req.params.id);
        if(newRecetteDelete){
            await Recette.findByIdAndDelete(req.params.id);
            res.status(200).json({message:'Recette Has Deleted'});
        }
        else{
            res.status(404).json({message:'Recette Not Found'});
        }
    }
))

module.exports=router;