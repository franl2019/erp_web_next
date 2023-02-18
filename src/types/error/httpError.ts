export class HttpError extends Error{

    public errorType: string = 'httpError';

    constructor(msg: string) {
        super(msg);
    }
}