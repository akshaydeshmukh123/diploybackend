const mongoose=require("mongoose");

const noteScema=mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    author:{type:String,required:true},
    category:{type:Number,required:true},
    authorID:{type:String,required:true}
},{
    versionKey:false
})

const noteModel=mongoose.model("note",noteScema)

module.exports={
    noteModel
}