import z from "zod";

export const updateProductSchema = z.object({
  id: z.string().regex(/^(?!\s*$).+/, "Insira o nome!"),

  name: z.string().regex(/^(?!\s*$).+/, "Insira o nome!"),

  description: z.string().regex(/^(?!\s*$).+/, "Insira a descrição!"),

  price: z.coerce.number<number>().min(0.01, "Insira um preço válido!"),
});

export type UpdateProductSchemaProps = z.infer<typeof updateProductSchema>;
