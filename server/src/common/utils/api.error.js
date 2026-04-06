class APIError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }

    static badRequest(message = "Bad Request") {
        return new APIError(400, message);
    }

    static unauthorized(message = "Unauthorized") {
        return new APIError(401, message);
    }

    static notFound(message = "Not Found") {
        return new APIError(404, message);
    }

    static conflict(message = "Conflict") {
        return new APIError(409, message);
    }
}

export default APIError;