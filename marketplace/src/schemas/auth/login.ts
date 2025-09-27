import z from "zod";

const minLength = 8;
const maxLength = 20;
const hasUppercase = /[A-Z]/;
const hasLowercase = /[a-z]/;
const hasNumber = /\d/;
const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

export const loginSchema = z.object({
  email: z.email("Por favor, digite um e-mail válido!"),

  password: z
    .string()
    .min(minLength, `A senha deve ter no mínimo ${minLength} caracteres`)
    .max(maxLength, `A senha deve ter no máximo ${maxLength} caracteres`)
    .refine((val) => hasUppercase.test(val), {
      message: "A senha deve conter pelo menos uma letra maiúscula",
    })
    .refine((val) => hasLowercase.test(val), {
      message: "A senha deve conter pelo menos uma letra minúscula",
    })
    .refine((val) => hasNumber.test(val), {
      message: "A senha deve conter pelo menos um número",
    })
    .refine((val) => hasSpecialChar.test(val), {
      message: "A senha deve conter pelo menos um caractere especial",
    }),
});
