import mongoose from "mongoose";

export const config={
    isConnected:0
};

export const connectionDB=async()=>{
     if (config.isConnected) {
         console.log("✅ Already connected to DB");
    return;
  }

    try{
      const {connection}=  await mongoose.connect(process.env.MONGODB_URL); 
      config.isConnected=connection.readyState;
      console.log("connected to db");
    }
    catch(err){
        console.log("DB connection failed");      
        console.log(err); 
    }
}