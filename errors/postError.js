class PostError extends Error {
    constructor(status = 500, message = 'Сервер сломался =(') {
        super();
        this.status = status;
        this.message = message;
        Error.captureStackTrace(this, PostError);
    }
}

module.exports = PostError;