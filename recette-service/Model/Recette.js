const mongoose=require('mongoose');

const SchemaRecette=new mongoose.Schema({
    libelle: {
        type: String,
        required: true
    },

  
},{
    timestamps:true
});
 
const Recette=mongoose.model('Recette',SchemaRecette);
module.exports={
    Recette
}