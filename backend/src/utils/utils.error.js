const errorList = {
    EMPTY_FIELD: {
        status: 400,
        message: 'This field is obligatory'
    },
    ONLY_LETTERS: {
        status: 400,
        message: 'This field only allows letters'
    },
    ONLY_NUMBERS: {
        status: 400,
        message: 'This field only allows numbers'
    },
    COMMA_REQUIRED: {
        status: 400,
        message: 'This field requires numbers separated with commas'
    },
    EMPTY_SPACES:{
        status: 400,
        message: "Empty spaces on key path aren't allowed"
    },
    NOT_STARTING_1: {
        status: 400,
        message: 'Key path must start with 1'
    },
    REPEATED_VALUES: {
        status: 400,
        message: "Repeated numbers aren't allowed in this method"
    },

    NOT_SORTED: {
        status: 400,
        message: 'Please put a key path starting with 1 and using its followed numbers'
    },
    NOT_FOUND: {
        status: 404,
        message: 'Error 404, not found'
    },
    SERVER_ERROR: {
        status: 500,
        message: 'Internal server error'
    }
}

export function sendError(res, error_type, field) {
    const errorMade = errorList[error_type];
    return res.status(errorMade.status).json({
        message: errorMade.message, field: field
    });

}