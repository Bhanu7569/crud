const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./model.js')
const cors = require('cors')


const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/Mern').then(
    ()=>{
        console.log("DB is connected..!")
    }
)


app.get('/', async(req, res)=>{
    const getuser = await userModel.find({});
    return res.status(200).json(getuser)
})

app.post('/createuser', async(req, res)=>{
    const {name, age, email} = req.body
    try{
        const newUser =await userModel.create({name,age,email});

        return res.status(200).json(newUser)

    }
    catch(error){
        return res.status(500).json({msg: error.message})
    }
})

app.get('/getuser/:id', async(req, res)=>{
    const {id} = req.params;
    try{
        const getuser = await userModel.findById({_id : id})
        return res.status(200).json(getuser)
    }
    catch(error){
        return res.status(500).json({msg : error.message})
    }

})

app.put('/updateUser/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const getuser = await userModel.findByIdAndUpdate({ _id: id }, { name: req.body.name, age: req.body.age, email: req.body.email });
        return res.status(200).json(getuser);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});


app.delete('/deleteuser/:id', async(req, res) =>{
    const { id } = req.params;
    try {
        const getuser = await userModel.findByIdAndDelete({ _id: id });
        return res.status(200).json(getuser);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
})


app.listen(3000, (req, res)=>{
    console.log("SErver is running...")
})