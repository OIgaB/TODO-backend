import mongoose from 'mongoose';
import 'dotenv/config';
import app from './app.js';

const { DB_HOST, PORT } = process.env;

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)  
  .then(() => {
    app.listen((PORT), () => {  
      console.log(`Database connection successful. Server running on port: ${PORT}`);
    })    
  })
  .catch(error => {
    console.log('server - Ми в catch');
    console.log(error.message);
    process.exit(1);  
  })