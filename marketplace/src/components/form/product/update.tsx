"use client";

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
  faIdCard,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { UpdateProductResponseDTO } from "@/types/dto/product/updateProductResponseDTO";
import { useState } from "react";
import { handleChangeFile } from "@/schemas/product/file";
import { useProduct } from "@/hooks/useProduct";
import {
  updateProductSchema,
  UpdateProductSchemaProps,
} from "@/schemas/product/update";

interface UpdateProductFormProps {
  productId: string;
  submitFn: (
    request: UpdateProductRequestDTO
  ) => Promise<UpdateProductResponseDTO>;
}

export const UpdateProductForm = ({
  submitFn,
  productId,
}: UpdateProductFormProps) => {
  const { product } = useProduct(productId);
  const [file, setFile] = useState<File | null>(null);

  const { reset, register, handleSubmit } = useForm<UpdateProductSchemaProps>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: product ?? undefined,
  });

  const onSubmit = async (request: UpdateProductSchemaProps) => {
    if (!file) {
      toast.error("Selecione uma imagem!");
      return;
    }

    const payload: UpdateProductRequestDTO = {
      id: request.id,
      name: request.name,
      description: request.description,
      image: file,
      price: request.price,
    };

    return await submitFn(payload);
  };

  const onError = (errors: FieldErrors<UpdateProductSchemaProps>) => {
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        toast.error(error.message);
      }
    });
  };

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit, onError)}>
      <InputIcon icon={faIdCard} {...register("id")} disabled />

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
        type="file"
        accept="image/*"
        placeholder="Selecione uma imagem"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const isChanged = handleChangeFile(event, setFile);
          if (isChanged?.error)
            isChanged.error.issues.map((e) => toast.error(e.message));
        }}
      />

      <InputIcon
        type="number"
        step="0.01"
        icon={faDollarSign}
        {...register("price")}
        placeholder="Preço do produto"
      />

      <ButtonContainer>
        <Button type="submit">Cadastar</Button>

        <Button
          type="button"
          background={"white"}
          onClick={() => reset(product ?? undefined)}
        >
          limpar
        </Button>
      </ButtonContainer>
    </FormStyled>
  );
};
