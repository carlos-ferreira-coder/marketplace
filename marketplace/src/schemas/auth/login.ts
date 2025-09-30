import z from "zod";

export const loginSchema = z.object({
  email: z.email("Por favor, digite um e-mail válido!"),

  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(20, "A senha deve ter no máximo 20 caracteres")
    .refine((s) => /[A-Z]/.test(s), {
      message: "A senha deve conter pelo menos uma letra maiúscula",
    })
    .refine((s) => /[a-z]/.test(s), {
      message: "A senha deve conter pelo menos uma letra minúscula",
    })
    .refine((s) => /\d/.test(s), {
      message: "A senha deve conter pelo menos um número",
    })
    .refine((s) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(s), {
      message: "A senha deve conter pelo menos um caractere especial",
    }),
});

export type LoginSchemaProps = z.infer<typeof loginSchema>;

export const loginDefaultValues = {
  email: "",
  password: "",
};
