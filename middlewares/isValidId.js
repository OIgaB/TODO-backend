import { isValidObjectId } from 'mongoose';
import { HttpError } from '../helpers/index.js';

const isValidId = (req, res, next) => {
    const { id } = req.params;
    // console.log('isValidId - id', id);
    if(!isValidObjectId(id)) {
        console.log('!isValidObjectId(id');
        next(HttpError(400, `${id} is not valid id`))
    }
    next();
}

export default isValidId;