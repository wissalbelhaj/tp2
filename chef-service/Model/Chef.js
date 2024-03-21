const mongoose=require('mongoose');

const SchemaChef=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    }
},{
    timestamps:true
});
 
const Chef=mongoose.model('Chef',SchemaChef);
module.exports={
    Chef
}