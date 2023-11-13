import { Task } from '../models/tasks.js'; 
import { HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/ctrlWrapper.js';


const getAll = async (req, res) => {
    const result = await Task.find({}, "-createdAt -updatedAt"); 
    // console.log('getAll - result :', result);
    res.json(result); 
};

const getById = async (req, res) => {
    const { id } = req.params; 
    const result = await Task.findById(id); 
    // console.log('getById - result', result);
    if(!result) { 
        throw HttpError(404, `Contact with id=${id} not found`);
    } 
    res.json(result); 
};

const add = async (req, res) => {
    const result = await Task.create({...req.body}); 
    // console.log('add - result', result);
    res.status(201).json(result); 
};

const updateById = async (req, res) => { // put
    const { id } = req.params;
    const result = await Task.findByIdAndUpdate(id, req.body, { new: true }); 
    // console.log('updateById - result:', result);
    if(!result) {
      throw HttpError(404, `Task with id=${id} not found`);
    }
    res.json(result);  
};


const deleteById = async (req, res) => {
    const { id } = req.params; 
    const result = await Task.findByIdAndDelete(id);  // result or null
    // console.log('deleteById - result:', result);
    if(!result) {
        throw HttpError(404, `Task with id=${id} not found`);
    }
    res.json({ message: `Task with id=${id} successfuly deleted` }); 
}

export default { 
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
}