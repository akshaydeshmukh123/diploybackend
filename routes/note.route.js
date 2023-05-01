const express=require("express");

const noteRouter=express.Router();
const {noteModel}=require("../../backend/model/note.model")


noteRouter.post("/create",async(req,res)=>{
    try{

        const note= new noteModel(req.body);
        await note.save()
        res.status(200).send({"msg":"New note has been added"})

    }catch(error){
res.status(400).send({"err":err.message})
    }

})

noteRouter.get("/",async(req,res)=>{
    try {
        const notes=await noteModel.find()
        res.status(200).send(notes)
    } catch (error) {
        res.status(400).send({"err":err.message})
    }
})


noteRouter.patch("/update/:noteID",async(req,res)=>{
    const {noteID}=req.params
    try {
        await noteModel.findByIdAndUpdate({_id:noteID},req.body)

        res.status(200).send({"msg":`the note with id:${noteID} has been updated`})
    } catch (error) {
        res.status(400).send({"err":err.message})

    }
    
})

noteRouter.delete("/delete/:noteID",async(req,res)=>{

    const {noteID}=req.params
    try {
        await noteModel.findByIdAndDelete({_id:noteID},req.body)

        res.status(200).send({"msg":`the note with id:${noteID} has been updated`})
    } catch (error) {
        res.status(400).send({"err":err.message})

    }
    
    
})

module.exports={
    noteRouter
}
