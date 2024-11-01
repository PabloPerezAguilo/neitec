import RestifyErrors from 'restify-errors'

const { RestError } = RestifyErrors;
class InvalidTransactionStatus extends RestError {
    constructor() {
        super({
            restCode: 'InvalidTransactionStatus',
            statusCode: 422,
            constructorOpt: InvalidTransactionStatus,
        }, 'Invalid status value');
    }
}

export { InvalidTransactionStatus }
