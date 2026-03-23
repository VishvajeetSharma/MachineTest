import "dotenv/config";
import app from "./app.js";
import dbConnect from "./dbConfig/db.js";

const PORT = process.env.PORT || 8000;

dbConnect();

app.listen(PORT, ()=>{
  console.log(`Server is running on: http://localhost:${PORT}`)
})