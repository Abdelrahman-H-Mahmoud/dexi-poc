const express=require('express');
const bodyparser=require('body-parser');
const config=require('./config');
let app =express();
app.use(bodyparser.json());


app.post('/api/v1/notify',(req,res)=>{
    let body=req.body;
    console.log(body);
});


app.listen(config.port,()=>{
    console.log(`app is running on ${config.port}`);
})