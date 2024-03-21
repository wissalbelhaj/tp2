const mongoose=require('mongoose');

const SchemaRestaurant=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    chef_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chef',
        required: true
    },
    recette_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recette',
        required: true
    }
    
},{
    timestamps:true
});
 
const Restaurant=mongoose.model('Restaurant',SchemaRestaurant);
module.exports={
    Restaurant
}