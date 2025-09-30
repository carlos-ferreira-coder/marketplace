"use client";

import { InputIcon } from "@/components/input";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/button";
import { CreateProductRequestDTO } from "@/types/dto/product/createProductRequestDTO";
import { ButtonContainer, FormStyled } from "..";
import {
  faAlignLeft,
  faDollarSign,
  faFileImage,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { CreateProductResponseDTO } from "@/types/dto/product/createProductResponseDTO";
import {
  createProductDefaultValues,
  createProductSchema,
  CreateProductSchemaProps,
} from "@/schemas/product/create";
import { useState } from "react";
import { handleChangeFile } from "@/schemas/product/file";

interface CreateProductFormProps {
  submitFn: (
    request: CreateProductRequestDTO
  ) => Promise<CreateProductResponseDTO>;
}

export const CreateProductForm = ({ submitFn }: CreateProductFormProps) => {
  const [file, setFile] = useState<File | null>(null);

  const { reset, register, handleSubmit } = useForm<CreateProductSchemaProps>({
    resolver: zodResolver(createProductSchema),
    defaultValues: createProductDefaultValues,
  });

  const onSubmit = async (request: CreateProductSchemaProps) => {
    if (!file) {
      toast.error("Selecione uma imagem!");
      return;
    }

    const payload: CreateProductRequestDTO = {
      name: request.name,
      description: request.description,
      image: file,
      price: request.price,
    };

    return await submitFn(payload);
  };

  const onError = (errors: FieldErrors<CreateProductSchemaProps>) => {
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
          onClick={() => reset(createProductDefaultValues)}
        >
          limpar
        </Button>
      </ButtonContainer>
    </FormStyled>
  );
};
