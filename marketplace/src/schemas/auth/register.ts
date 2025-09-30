import { isCPF } from "@/utils/cpf";
import z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .regex(
        /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/,
        "Digite o nome completo (nome e sobrenome)"
      ),

    email: z.email("Digite um e-mail válido"),

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

    passwordCheck: z.string(),

    phone: z
      .string()
      .regex(
        /^\(\d{2}\) \d{5}-\d{4}$/,
        "Digite um telefone no formato (99) 99999-9999"
      ),

    cpf: z
      .string()
      .refine(
        (s) => isCPF(s),
        "Digite um CPF válido no formato 000.000.000-00"
      ),
  })
  .superRefine(({ password, passwordCheck }, ctx) => {
    if (password !== passwordCheck) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não correspondem!",
        path: ["password"],
      });
    }
  });

export type RegisterSchemaProps = z.infer<typeof registerSchema>;

export const registerDefaultValues = {
  name: "",
  email: "",
  password: "",
  phone: "",
  cpf: "",
};
