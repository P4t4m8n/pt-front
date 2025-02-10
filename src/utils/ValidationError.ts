type TValidationError<T> = {
  message: string;
  errors: Record<keyof T, string>;
};

export class ValidationError<T> extends Error {
  public readonly validationErrors?: TValidationError<T>;

  constructor(message: string, validationErrors?: TValidationError<T>) {
    super(message);
    this.name = "ValidationError";
    this.validationErrors = validationErrors;
  }

  public static create<T>(
    message: string,
    validationErrors?: TValidationError<T>
  ) {
    return new ValidationError(message, validationErrors);
  }
}
