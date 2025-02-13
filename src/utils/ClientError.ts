type TClientError<T> = {
  message: string;
  errors: Record<keyof T, string>;
};

enum EClientErrorCodes {
  VALIDATION_ERROR = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
}

const clientErrorMap = new Map<number, string>([
  [EClientErrorCodes.VALIDATION_ERROR, "Validation Error"],
  [EClientErrorCodes.UNAUTHORIZED, "Unauthorized"],
  [EClientErrorCodes.FORBIDDEN, "Forbidden"],
  [EClientErrorCodes.NOT_FOUND, "Not Found"],
  [EClientErrorCodes.CONFLICT, "Conflict"],
]);

export class ClientError<T> extends Error {
  public readonly validationErrors?: TClientError<T>;

  constructor(message: string, validationErrors?: TClientError<T>) {
    super(message);
    this.name = "ValidationError";
    this.validationErrors = validationErrors;
  }

  public static create<T>(status: number, validationErrors?: TClientError<T>) {
    const message = clientErrorMap.get(status) || "Client Error";
    return new ClientError(message, validationErrors);
  }
}
