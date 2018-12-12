let config=require('./config');
let Dexi=require('./libs/dexi').Dexi;
let dexi=new Dexi(config.dexi);

module.exports=function handleIncomingDexiNotification(obj){
    return dexi.getRunResult(obj.runId);
}