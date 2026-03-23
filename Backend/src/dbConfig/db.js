import mongoose from 'mongoose';

const dbConnect = async ()=>{

  const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/todo_manager";

  try {
    const conn = mongoose.connect(MONGODB_URI);
    if(conn){
      console.log(`DB Connected.`)
    }
  } catch (error) {
    console.error(`DB Connection Failed. ${error}`);
    process.exit(1)
  }
}

export default dbConnect;