import { Task } from '../models/tasks.js'; 
import { ctrlWrapper } from '../decorators/ctrlWrapper.js';


const getAll = async (req, res) => {
    const result = await Task.find({}, "-createdAt -updatedAt"); 
    // console.log('task-controller - result :', result);
    res.json(result); 
};

const add = async (req, res) => {
    const result = await Task.create({...req.body}); 
    // console.log('in add - result', result);
    res.status(201).json(result); 
  }

export default { 
    getAll: ctrlWrapper(getAll),
    add: ctrlWrapper(add),
}