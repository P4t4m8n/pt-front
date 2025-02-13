type TServerError<T> = {
  errors: Record<keyof T, string>;
};

export class ServerError<T> extends Error {
  public readonly validationErrors?: TServerError<T>;

  constructor(message: string) {
    super(message);
    this.name = "Server Error";
  }

  public static create(message: string) {
    return new ServerError(message);
  }
}
