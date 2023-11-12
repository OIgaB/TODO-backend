import express from 'express';
import { tasksCtrl } from '../../controllers/index.js'; 
import { validateBody } from '../../decorators/validateBody.js'
import { schemas } from '../../models/tasks.js';
import { isEmptyBody/*, isValidId*/ } from '../../middlewares/isEmptyBody.js';

const router = express.Router(); 


router.get('/', tasksCtrl.getAll);

router.post('/', isEmptyBody, validateBody(schemas.addSchema), tasksCtrl.add);


export default router; 