export class AppError extends Error {
    public status?: number;
    public data: any;
    constructor(status: number, message: string, data: any = undefined) {
        super(message);
        this.status = status;
        this.data = data;
    }
}
