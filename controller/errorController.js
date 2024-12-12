const sendErrorDev =  (error, response) => {
    const statusCode = error.statusCode || 500;
    const status = error.status || 'error';
    const message = error.message;
    const stack = error.stack;

    response.status(statusCode).json({
        status,message,stack
    })
}

const sendErrorProd =  (error, response) => {
    const statusCode = error.statusCode || 500;
    const status = error.status || 'error';
    const message = error.message;
    const stack = error.stack;

    if(error.isOperational){
        return response.status(statusCode).json({
            status,message,stack
        })
    }

    return response.status(500).json({message: "Internal server error"})
    
}

const globalErrorHandler = (error, request, response, next) => {
    if(process.env.NODE_ENV === 'development'){
        return sendErrorDev(error, response);
    }

    sendErrorProd(error, response)
}

module.exports = globalErrorHandler;