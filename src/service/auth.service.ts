//Types
import { TAuthSignInDto, TAuthSignUpDto } from "../types/auth.type";
import { TUser } from "../types/user.type";
//Utils
import { validationUtil } from "../utils/validation.util";
import { ValidationError } from "../utils/ValidationError";
//Services
import { apiService } from "./api.service";
/**
 * The base URL for the authentication service.
 */
const BASE_URL = "auth/";
/**
 * Retrieves the current session user.
 *
 * @returns {Promise<TUser | null>} A promise that resolves to the current session user of type `TUser` or `null` if no user is found.
 */
const getSessionUser = async (): Promise<TUser | null> => {
  return await apiService.get<TUser>(BASE_URL + "session");
};
/**
 * Signs out the current user.
 *
 * @returns {Promise<void>} A promise that resolves when the user is signed out.
 */
const signOut = async (): Promise<void> => {
  await apiService.post(BASE_URL + "sign-out");
  return;
};
/**
 * Registers a new user with the provided form data.
 * Validates the form data before registration.
 * @param {FormData} formData - The form data containing user details.
 * @returns {Promise<TUser>} A promise that resolves to the registered user of type `TUser`.
 * @throws {ValidationError} Thrown if the form data is invalid.
 */
const signUp = async (formData: FormData): Promise<TUser> => {
  const dto = formDataToDto(formData);
  const errors = validateSignUpDto(dto as TAuthSignUpDto);
  if (Object.keys(errors).length > 0) {
    throw ValidationError.create("Validation Error", { message: "", errors });
  }
  return await apiService.post<TAuthSignUpDto, TUser>(
    BASE_URL + "sign-up",
    dto as TAuthSignUpDto
  );
};
/**
 * Authenticates a user with the provided form data.
 * Validates the form data before authentication.
 * @param {FormData} formData - The form data containing user credentials.
 * @returns {Promise<TUser>} A promise that resolves to the authenticated user of type `TUser`.
 * @throws {ValidationError} Thrown if the form data is invalid.
 */
const signIn = async (formData: FormData): Promise<TUser> => {
  const dto = formDataToDto(formData);
  const errors = validateSignInDto(dto as TAuthSignInDto);
  if (Object.keys(errors).length > 0) {
    throw ValidationError.create("Validation Error", { message: "", errors });
  }

  return await apiService.post<TAuthSignInDto, TUser>(
    BASE_URL + "sign-in",
    dto as TAuthSignInDto
  );
};
/**
 * Redirects the user to the Google sign-in page.
 * @returns {Promise<void>} A promise that resolves when the redirection is complete.
 */
const googleRedirect = async (): Promise<void> => {
  return await apiService.get(BASE_URL + "google");
};
/**
 * Converts the form data to a data transfer object (DTO) for user registration or authentication.
 *
 * @param {FormData} formData - The form data containing user details.
 * @returns {TAuthSignInDto | TAuthSignUpDto} The data transfer object containing user details.
 */
const formDataToDto = (formData: FormData): TAuthSignInDto | TAuthSignUpDto => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  return { email, password, firstName, lastName };
};
/**
 * Validates the sign-up data transfer object (DTO) for user registration.
 *
 * @param {TAuthSignUpDto} userDto - The user sign-up data transfer object containing user details.
 * @returns {Record<string, string>} An object containing validation errors, if any. The keys are the field names and the values are the corresponding error messages.
 */
const validateSignUpDto = (userDto: TAuthSignUpDto): Record<string, string> => {
  const errors: Record<string, string> = {};

  const emailError = _validateEmail(userDto?.email);
  if (emailError) errors.email = emailError;
  const passwordError = _validatePassword(userDto?.password);
  if (passwordError) errors.password = passwordError;

  const firstNameError = _validateNames(userDto?.firstName, "First Name");
  if (firstNameError) errors.firstName = firstNameError;

  const lastNameError = _validateNames(userDto?.lastName, "Last Name");
  if (lastNameError) errors.lastName = lastNameError;

  return errors;
};
/**
 * Validates the sign-in data transfer object (DTO) for user authentication.
 *
 * @param {TAuthSignInDto} userDto - The data transfer object containing user sign-in information.
 * @returns {Record<string, string>} An object containing validation errors, if any. The keys are the field names and the values are the corresponding error messages.
 */
const validateSignInDto = (userDto: TAuthSignInDto): Record<string, string> => {
  const errors: Record<string, string> = {};

  const emailError = _validateEmail(userDto?.email);
  if (emailError) errors.email = emailError;

  const passwordError = _validatePassword(userDto?.password);
  if (passwordError) errors.password = passwordError;

  return errors;
};
/**
 * Private function.
 * Validates the given email address.
 *
 * @param email - The email address to be validated.
 * @returns A message if the email is invalid, otherwise null.
 */
const _validateEmail = (email?: string): string | null => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    return "Please provide a valid email address.";
  }
  return null;
};
/**
 * Private function.
 * Validates the given password.
 *
 * @param password - The password to be validated.
 * @returns A message if the password is invalid, otherwise null.
 */
const _validatePassword = (password?: string): string | null => {
  if (!password) {
    return "Password is required.";
  }
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  if (!passwordPattern.test(password)) {
    return "Password must contain at least one uppercase letter, one lowercase letter, and one number.";
  }
  return null;
};
/**
 * Private function.
 * Validates the given name.
 *
 * @param name - The name to be validated.
 * @param fieldName - The name of the field being validated.
 * @returns A message if the name is invalid, otherwise null.
 */
const _validateNames = (name: string, fieldName: string) => {
  const errorLen = validationUtil.validateStrLength(fieldName, 2, name);
  if (errorLen) {
    return errorLen;
  }

  const error = validationUtil.validateLetters(fieldName, name);
  if (error) {
    return error;
  }

  return null;
};
export const authService = {
  getSessionUser,
  signOut,
  googleRedirect,
  signUp,
  signIn,
};
