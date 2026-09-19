import 'dotenv/config';
import mongoose from 'mongoose'

 mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Database connected successfully")}).catch((err) => {
    console.log("Could not connect to the database: ", err);});