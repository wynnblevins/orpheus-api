type ErrorName = 'NOT_FOUND_ERROR' | 'INTERNAL_SERVER_ERROR';

export class ApplicationError extends Error {
  name: ErrorName;
  message: string;

  constructor ({ 
    name,
    message,
  }: {
    name: ErrorName,
    message: string,
  }) {
    super();
    this.name = name;
    this.message = message;

    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}