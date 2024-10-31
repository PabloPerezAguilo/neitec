import RestifyErrors from 'restify-errors'

const { RestError } = RestifyErrors;
class InvalidFormatPassword extends RestError {
    constructor() {
        super({
            restCode: 'InvalidFormatPassword',
            statusCode: 422,
            constructorOpt: InvalidFormatPassword,
        }, 'Password must have 6 characters or more');
    }
}

export { InvalidFormatPassword }
