const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const cors= require('cors');
const User = require('./model/User.js')
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000 ;

mongoose.connect(process.env.DATABASE)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
      });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.get('/getdata',async(req,res)=>{
    try{
        const users = await User.find();
        res.json(users);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
})

app.delete('/deleteData',async(req,res)=>{
    const id = req.body.id;
    try{
        const response = await User.findOneAndDelete({_id:id});
        res.send({success:true})
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
})

app.post('/postdata',async(req,res)=>{
    try{
        let {name,height,weight,labelh,labelw} = await req.body;
        if (labelh === "inches") {
            height = parseFloat(height) * 0.0254;
            console.log(height);
        }
        
        if (labelh === "cm") {
            height = parseFloat(height) * 0.01;
        }
        
        if (labelw === "lbs") {
            weight = parseFloat(weight) * 0.45359237;
        }
        const bmi = parseFloat(weight)/(parseFloat(height)*parseFloat(height));
        console.log(bmi);
        const user = new User({
            name:name,
            height:height,
            weight:weight,
            bmi:bmi
        })
        console.log(user);
        await user.save();
        res.send({bmi,user});

    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
})
