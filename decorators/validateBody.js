import { HttpError } from '../helpers/index.js';


export const validateBody = schema => {  // отримує joi-схему (addSchema)
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body); 
        //здійснюється перевірка полів об'єкта на відповідність addSchema - повертається об'єкт з результатами перевірки
        // одним з ключів цього об'єкту є error, значенням якого буде undefind, якщо валідація успішна
        if(error) { // якщо валідація повернула помилку, то це буде об'єкт помилки з властивістю message (вказано у чому саме проблема)
            next(HttpError(400, error.message));  // наприклад, якщо передати не повний об'єкт - "\"phone\" is required" 
        }
        next();
    }
    return func; // повертає ф-цію, яка робить валідацію
}

// export default validateBody;