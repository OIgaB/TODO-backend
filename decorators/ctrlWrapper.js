export const ctrlWrapper = ctrl => { 
    const func = async(req, res, next) => { 
        try {
            // console.log('ctrlWrapper - try - before', ctrl);
            await ctrl(req, res, next); 
            // console.log('ctrlWrapper - try - after');
        } catch(error) {  
            // console.log('ctrlWrapper - catch');
            next(error);   
        }
    }
    
    return func;
}