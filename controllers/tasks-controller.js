import { Task } from '../models/tasks.js'; 
import { HttpError } from '../helpers/HttpError.js';
import { ctrlWrapper } from '../decorators/ctrlWrapper.js';


const getAll = async (req, res) => {
    const result = await Task.find({}, "-createdAt -updatedAt"); 
    res.json(result); 
};

const getById = async (req, res) => {
    const { id } = req.params; 
    const result = await Task.findById(id); 
    if(!result) { 
        throw HttpError(404, `Contact with id=${id} not found`);
    } 
    res.json(result); 
};

const add = async (req, res) => {
    const result = await Task.create({...req.body}); 
    res.status(201).json(result); 
};

const updateById = async (req, res) => { // put
    const { id } = req.params;
    const result = await Task.findByIdAndUpdate(id, req.body, { new: true }); 
    if(!result) {
      throw HttpError(404, `Task with id=${id} not found`);
    }
    res.json(result);  
};

const updateStatusTask = async (req, res) => { // patch
    const { id } = req.params;
    const result = await Task.findByIdAndUpdate(id, req.body, { new: true }); 
    if(!result) {
      throw HttpError(404, `Task with id=${id} not found`); 
    }
    res.json(result); 
};

const deleteById = async (req, res) => {
    const { id } = req.params; 
    const result = await Task.findByIdAndDelete(id);  // result or null
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
    updateStatusTask: ctrlWrapper(updateStatusTask),
    deleteById: ctrlWrapper(deleteById),
}