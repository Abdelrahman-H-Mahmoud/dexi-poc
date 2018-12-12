const express=require('express');
const bodyparser=require('body-parser');
const config=require('./config');

const handle_data=require('./handle-data');

let app =express();
app.use(bodyparser.json());


app.post('/api/v1/notify',(req,res)=>{
    let body=req.body;
    res.sendStatus(200);
    handle_data(body).then((data)=>{
        console.log(data);
    });
});


app.listen(config.port,()=>{
    console.log(`app is running on ${config.port}`);
})