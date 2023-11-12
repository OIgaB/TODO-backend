export const ctrlWrapper = ctrl => {  //отримує, наприклад, getContactById

    console.log('ctrlWrapper');

    const func = async(req, res, next) => { 
        console.log('ctrlWrapper - func');
        try {
            console.log('ctrlWrapper - try');
            await ctrl(req, res, next); // передача значень в getContactById
        } catch(error) {  // якщо в контролері станеться помилка, ф-ція-обгортка спіймає її і передасть в catch
            console.log('ctrlWrapper - catch');
            next(error);  // express піде далі шукати обробника помилок (ф-цію з 4-ма параметрами: err, req, res, next)
                          // і знайде в app.js => в мідлварі для статусу 500
                          // Error: Contact with id=qdggE76Jtbfd9eWJHrss not found 
        }
    }
    
    return func;
}