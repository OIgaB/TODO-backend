import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import tasksRouter from './routes/api/tasks.js'; 


const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'; 

app.use(logger(formatsLogger)); 
app.use(cors()); 
app.use(express.json());

app.use('/api/tasks', tasksRouter);


app.use((req, res) => {  
    console.log('Ми в мідлварі 404'); 
    res.status(404).json({ message: 'Not found' })  
}) 
  
app.use((err, req, res, next) => {
    console.log('Ми в мідлварі 500'); 
    const {status = 500, message = "Server error"} = err;
    // res.status(500).json({ message: err.message })    
    res.status(status).json({ message })
})
  
export default app;