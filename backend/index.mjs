import './db.js';
import cors from 'cors'
import express from 'express';
import router from './routes/auth.js';
import nrouter from './routes/notes.js';


const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","*");

    if(req.method=="OPTIONS"){
        res.header("Access-Control-Allow-Methods","POST, PUT, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});


app.use('/api/auth.js', router);
app.use('/api/notes.js', nrouter);
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions))

app.listen(port, () => {
    console.log(`listening to the port ${port}`);
})
