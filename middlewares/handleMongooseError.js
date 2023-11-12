export const handleMongooseError = (error, data, next) => {
    const { name, code } = error; //name, code вказують, яку помилку отримали
    //помилка дублювання унікального поля: name - MongoServerError, code - 11000
    //інша помилка: name - ValidationError, code - undefined

    const status = (name === 'MongoServerError' && code === 11000) ? 409 : 400;
    error.status = status;
    next();
}