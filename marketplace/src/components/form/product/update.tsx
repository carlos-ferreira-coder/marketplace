import { InputIcon } from "@/components/input";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/button";
import { UpdateProductRequestDTO } from "@/types/dto/product/updateProductRequestDTO";
import { ButtonContainer, FormStyled } from "..";
import {
  faAlignLeft,
  faDollarSign,
  faFileImage,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { UpdateProductResponseDTO } from "@/types/dto/product/updateProductResponseDTO";

interface UpdateProductFormProps {
  submitFn: (
    request: UpdateProductRequestDTO
  ) => Promise<UpdateProductResponseDTO>;
}

export const UpdateProductForm = ({ submitFn }: UpdateProductFormProps) => {
  const { reset, register, handleSubmit } = useForm<UpdateProductSchemaProps>({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: UpdateProductDefaultValues,
  });

  const onSubmit = async (request: UpdateProductSchemaProps) =>
    await submitFn(request);

  const onError = (errors: FieldErrors<UpdateProductRequestDTO>) => {
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        toast.error(error.message);
      }
    });
  };

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit, onError)}>
      <InputIcon
        icon={faTag}
        {...register("name")}
        placeholder="Nome do produto"
      />

      <InputIcon
        icon={faAlignLeft}
        {...register("description")}
        placeholder="Descrição do produto"
      />

      <InputIcon
        icon={faFileImage}
        {...register("image")}
        type="file"
        accept="image/*"
        placeholder="Selecione uma imagem"
      />

      <InputIcon
        type="number"
        step="0.01"
        icon={faDollarSign}
        {...register("price")}
        placeholder="Preço do produto"
      />

      <ButtonContainer>
        <Button type="submit">UpdateProduct</Button>

        <Button
          type="button"
          background={"white"}
          onClick={() => reset(UpdateProductDefaultValues)}
        >
          limpar
        </Button>
      </ButtonContainer>
    </FormStyled>
  );
};
