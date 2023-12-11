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
const HexSchema = z.string().refine(
  (color: string) => {
    // Custom validation logic
    const isValidFormat = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);

    return isValidFormat;
  },
  {
    message: "Invalid color format.",
  }
);

const Term = z.boolean().refine((value) => value === true, {
  message: "Required",
});

const ReviewZod = z.string().min(10).max(1000);

const ratingSchema = z.number().refine(
  (value: number) => {
    return value >= 0 && value <= 5 && value % 0.5 === 0;
  },
  {
    message: "Rating must be a number between 0.5 and 5 with a step of 0.5",
  }
);
export { passwordSchema };
export { Term };
export { ReviewZod };
export { emailSchema };
export { NameSchema };
export { ratingSchema };
export { HexSchema };
