import { TAuthSignInDto, TAuthSignUpDto } from "../types/auth.type";

type TValidationError = {
  message: string;
  errors: Record<keyof TAuthSignInDto | keyof TAuthSignUpDto, string>;
};

export class ValidationError extends Error {
  public readonly validationErrors?: TValidationError;

  constructor(message: string, validationErrors?: TValidationError) {
    super(message);
    this.name = "ValidationError";
    this.validationErrors = validationErrors;
  }

  public static create(message: string, validationErrors?: TValidationError) {
    return new ValidationError(message, validationErrors);
  }
}
