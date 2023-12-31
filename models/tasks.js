import { Schema, model } from 'mongoose';
import Joi from 'joi'; 
import { validateAtUpdate } from '../middlewares/index.js';
import { handleMongooseError } from '../middlewares/index.js';

const priorities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//mongoose-Schema - requirements to object (checking filds to be sent to DB): 
const taskSchema = new Schema({ 
  title: {
    type: String,
    required: [true, 'Set title for task'],
  },
  description: {
    type: String, 
    default: "",
  },
  priority: {
    type: Number,
    enum: priorities,
    default: priorities.length,
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true }); 

taskSchema.pre('findOneAndUpdate', validateAtUpdate); 
taskSchema.post('save', handleMongooseError); 
taskSchema.post('findOneAndUpdate', handleMongooseError); 


// for post-requests 
const addSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  priority: Joi.string().valid(...priorities),
  completed: Joi.boolean(),
}); 

// for put-requests 
const updateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  priority: Joi.string().valid(...priorities),
  completed: Joi.boolean(),
}); 

// for patch-requests
const updateCompletedSchema = Joi.object({
  completed: Joi.boolean().required(),
}); 

export const schemas = {
  addSchema,
  updateSchema,
  updateCompletedSchema,
}

export const Task = model('task', taskSchema); 