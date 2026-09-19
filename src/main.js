import 'dotenv/config';
import express from 'express';
import './common/db/mongoose.js'

const app = express();
app.use(express.json());



app.listen(process.env.APP_PORT, () => {
    console.log(`Server started on port ${process.env.APP_PORT}`);
})