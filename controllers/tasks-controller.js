import { Task } from '../models/tasks.js'; 
import { HttpError } from '../helpers/index.js';
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
};

const updateById = async (req, res) => { // put
    const { id } = req.params;
    const result = await Task.findByIdAndUpdate(id, req.body, { new: true }); 
    console.log('in updateById:', result);
    if(!result) {
      throw HttpError(404, `Task with id=${id} not found`);
    }
    res.json(result);  
};


const deleteById = async (req, res) => {
    const { id } = req.params; 
    const result = await Task.findByIdAndDelete(id);  // result or null
    // console.log('in deleteById:', result);
    if(!result) {
        throw HttpError(404, `Task with id=${id} not found`);
    }
    res.json({ message: `Task with id=${id} successfuly deleted` }); 
}

export default { 
    getAll: ctrlWrapper(getAll),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
}