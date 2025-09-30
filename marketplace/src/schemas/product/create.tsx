import z from "zod";

export const createProductSchema = z.object({
  name: z.string().regex(/^(?!\s*$).+/, "Insira o nome!"),

  description: z.string().regex(/^(?!\s*$).+/, "Insira a descrição!"),

  price: z.coerce.number<number>().min(0.01, "Insira um preço válido!"),
});

export type CreateProductSchemaProps = z.infer<typeof createProductSchema>;

export const createProductDefaultValues = {
  name: "",
  description: "",
  price: 0,
};
