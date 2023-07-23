const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/inotebook',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connected to mongodb successfully...");
}).catch(()=>{
    console.log("connection with mongodb failed...")
})