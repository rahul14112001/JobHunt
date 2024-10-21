//// IN PACKAGE.JSON WE HAVE SET THE TYPE:MODULE SO THAT WE CAN USE IMPORT IN THIS FILE////////

import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from "./utils/db.js";
import userRoute from './routes/user.route.js'
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'
import applicationRoute from './routes/application.route.js'
dotenv.config({});

const app=express();
app.use(cors({
    origin: 'http://localhost:5173', // Allow only this origin
    credentials: true // If you need to send cookies or authorization headers
  }));


//////////  MIDDLEWARE   //////////////////////////////////////////////////////////////
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions={
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));
///////////////////////////////////////////////////////////////////////////////////////



const PORT = process.env.PORT || 3000;

/////// API's////////
app.use('/api/v1/user',userRoute);
app.use('/api/v1/company',companyRoute);
app.use('/api/v1/job',jobRoute);
app.use('/api/v1/application',applicationRoute);


app.listen(PORT,()=>{
    connectDb();
    console.log(`server running at port ${PORT}`);
});