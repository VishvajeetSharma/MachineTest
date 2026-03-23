import express from "express";

const router = express.Router();

router.post(`/create-user`, (req,res)=>{
  res.send("working.....");
})

export default router;