import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8)
  .max(20)
  .refine(
    (password: string) => {
      const hasLowercase = /[a-z]/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasDigit = /\d/.test(password);

      const errors: string[] = [];
      if (!hasLowercase) errors.push("at least one lowercase letter");
      if (!hasUppercase) errors.push("at least one uppercase letter");
      if (!hasDigit) errors.push("at least one digit (0-9)");

      return errors.length === 0;
    },
    {
      message:
        "Password must be 8-20 characters long and include at least one lowercase letter, one uppercase letter, and one digit",
    }
  );

const emailSchema = z.string().email({
  message: "Invalid email address format",
});

const NameSchema = z.string().refine(
  (firstName: string) => {
    // Custom validation logic
    const isValidFormat = /^[a-zA-Z]+(?:\s[a-zA-Z]+){0,2}$/.test(firstName);

    return isValidFormat;
  },
  {
    message: "Invalid first name format.",
  }
);

const Term = z.boolean().refine((value) => value === true, {
  message: "Required",
});

export { passwordSchema };
export { Term };
export { emailSchema };
export { NameSchema };
