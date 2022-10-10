export class VerifyParamError extends Error {

    public errorType: string = 'verifyParamError';
    public errors: any[] = []

    constructor(msg: string, errors?: any[]) {
        super(msg);
        this.errors = errors ? errors : []
    }
}