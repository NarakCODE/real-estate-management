import { ZodError } from "zod";
import { ErrorCodeEnum } from "../enums/error-code.enum";

interface FormattedZodError {
  errors: Array<{
    field: string | number;
    message: string;
  }>;
}

export const formatZodError = (error: ZodError): FormattedZodError => {
  const formattedErrors = error.errors.map((err) => ({
    field: err.path[0],
    message: err.message,
  }));
  return { errors: formattedErrors };
};
