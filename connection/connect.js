const mongoose=require("mongoose");

async function connectMongodb(url){
    return mongoose.connect(url)
    .then(()=>console.log("MongoDB Connect"))
    .catch((err)=>console.log("MongoDB ",err));
}

module.exports={connectMongodb};