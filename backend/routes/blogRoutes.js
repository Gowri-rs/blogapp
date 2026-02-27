const express = require('express');
const router = express.Router();
const blogModel = require("../models/blogModel")
const jwt = require("jsonwebtoken");

//adding middleware
function verifyToken(req,res,next) {
    let token=req.headers.token;
    try {
        if(!token) throw "Unauthorized Access"
        let payload =jwt.verify(token,"secret")
        if(!payload) throw "Unauthorized Access"
        next()

    } catch (error) {
        res.json({message:error})
    }
    
}

router.get('/', async (req,res) => {
    try {
        const blogs = await blogModel.find()

        if(!blogs){
            res.status(404).send({message:"blogs not found"})
        }
        res.status(200).send({
            message:'blogs succesfully fetched', blogs
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"error fetching blogs", error})
    }    

    
});

router.post('/add',verifyToken, async(req,res)=>{
    try {
        const {title,description,imageUrl} = req.body;

        if(!title || !description || !imageUrl){
            return res.status(400).json({message:'please provide all fields'})
        }
        const newBlog = new blogModel({title,description,imageUrl})
        await newBlog.save()
        res.status(201).send({message: "blog added",newBlog})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'error adding blogs' , error})
    }
})

router.put('/updation/:id',verifyToken, async (req,res) => {
    try {
        const {id} = req.params;
        const {title,description,imageUrl} = req.body;
        const blog = await blogModel.findByIdAndUpdate(id,req.body,{new:true} )
        return res.status(200).send({message: ' updated successfully',blog })

    } catch (error) {
        console.log(error)
        return res.status(500).send({message:'error updating blogs', error})
    }
})

router.get('/:id', async (req,res) => {

    try {
            const {id} = req.params;
            const blog = await blogModel.findById(id);
        if(!blog){
            return res.status(400).send({message: "cannot find get id"})
        } 
        return res.status(200).send({message: "id fetched successfully", blog})
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:"error fetching blog by id"})
    }
    
})

router.delete('/deletion/:id',verifyToken, async (req,res) => {
    try {
        const {id} = req.params;
        const blog = await blogModel.findByIdAndDelete(id);
        if(!blog){
            return res.status(404).send({message:"blog not found by id"})
        } return res.status(200).send({message:'successfully deleted'})
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: 'error deleting blog'})
    }
})


module.exports= router;