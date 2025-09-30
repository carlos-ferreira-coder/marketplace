import z from "zod";

export const handleChangeFile = (
  event: React.ChangeEvent<HTMLInputElement>,
  setFile: (files: File) => void
) => {
  const filesSchema = z
    .instanceof(FileList, {
      message: "Selecione um arquivo de imagem!",
    })
    .refine((files) => files.length > 0, {
      message: "Selecione uma imagem!",
    })
    .refine((files) => files.length === 1, {
      message: "Selecione apenas uma imagem!",
    })
    .refine((files) => files[0].size <= 5 * 1024 * 1024, {
      message: "O arquivo deve ser menor que 5MB!",
    })
    .refine(
      (files) =>
        ["image/svg+xml", "image/jpg", "image/jpeg", "image/png"].includes(
          files[0].type
        ),
      {
        message: "O arquivo deve ser uma imagem!",
      }
    );

  const files = event.target.files;
  if (files && files.length > 0) {
    const { success, error } = filesSchema.safeParse(files);

    if (success) {
      setFile(files[0]);
      return { success };
    }

    return { error };
  }
};
