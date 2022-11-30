export default class ValidationError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.status = status;
  }
}
