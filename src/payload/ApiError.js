// Use Js Class
class ApiError extends Error {
    constructor(status, error, stack){
        super(error);

        this.status = status;
        this.error = error;
        this.stack = stack;
    }
}

module.exports = {
    ApiError
}



// magic happens here
// if i change this.message to this.msg whole api error take msg 