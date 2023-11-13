import express from 'express';
import { tasksCtrl } from '../../controllers/index.js'; 
import { validateBody } from '../../decorators/validateBody.js'
import { schemas } from '../../models/tasks.js';
import { isEmptyBody, isValidId } from '../../middlewares/index.js';

const router = express.Router(); 


router.get('/', tasksCtrl.getAll);

router.get('/:id', isValidId, tasksCtrl.getById);

router.post('/', isEmptyBody, validateBody(schemas.addSchema), tasksCtrl.add);

router.put('/:id', isValidId, isEmptyBody, validateBody(schemas.addSchema), tasksCtrl.updateById);

router.delete('/:id', isValidId, tasksCtrl.deleteById);


export default router; 