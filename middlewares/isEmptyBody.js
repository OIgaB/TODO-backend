import { HttpError } from '../helpers/index.js';

const isEmptyBody = (req, res, next) => {
    // console.log('isEmptyBody - req.body:', req.body);
    const { length } = Object.keys(req.body); 

    if(!length) { 
        next(HttpError(400, 'There are no fields in the body'));
    }
    next();
}

export default isEmptyBody;