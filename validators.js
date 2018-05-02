function validateMailForm(reqBody) {
    // reject form with missing fields
    const requiredFields = ['name', 'email', 'message'];
    const missingField = requiredFields.find(field => !(field in reqBody));

    if (missingField) {
        return {
            code: 422,
            reason: 'ValidationError',
            message: 'Missing field',
            location: missingField
        }
    }

// reject non-string fields
    const stringFields = ['name', 'email', 'message', 'org', 'phone'];
    const nonStringField = stringFields.find(field => (field in reqBody && typeof reqBody[field] !== 'string'));

    if (nonStringField) {
        return {
            code: 422,
            reason: 'ValidationError',
            message: 'Non-string field',
            location: nonStringField
        }
    }

// Check that email follows valid pattern
    const emailIsValid = email => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    if (!(emailIsValid(reqBody.email))) {
        return {
            code: 422,
            reason: 'ValidationError',
            message: 'Invalid email address',
            location: 'email'
        }
    }

    return 'ok';
}

module.exports = {validateMailForm};