"use client";

import { Button } from "@/components/button";
import { InputIcon } from "@/components/input";
import {
  registerDefaultValues,
  registerSchema,
  RegisterSchemaProps,
} from "@/schemas/auth/register";
import { RegisterRequestDTO } from "@/types/dto/user/registerRequestDTO";
import {
  faEnvelope,
  faIdCard,
  faLock,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ButtonContainer, FormStyled } from "..";

interface RegisterFormProps {
  submitFn: (request: RegisterRequestDTO) => Promise<void>;
}

export const RegisterForm = ({ submitFn }: RegisterFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { reset, register, handleSubmit } = useForm<RegisterSchemaProps>({
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  });

  const onSubmit = (request: RegisterSchemaProps) => {
    const params = new URLSearchParams();

    const productId = searchParams.get("productId");
    if (productId) params.append(productId, productId);

    router.replace(`${window.location.pathname}?${params.toString()}`);

    submitFn(request);
  };

  const onError = (errors: FieldErrors<RegisterSchemaProps>) => {
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        toast.error(error.message);
      }
    });
  };

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit, onError)}>
      <InputIcon
        icon={faUser}
        {...register("name")}
        placeholder="Digite seu nome completo"
      />

      <InputIcon
        icon={faEnvelope}
        {...register("email")}
        placeholder="Digite seu e-mail"
      />

      <InputIcon
        icon={faLock}
        type="password"
        {...register("password")}
        placeholder="Digite sua senha"
      />

      <InputIcon
        icon={faLock}
        type="password"
        {...register("passwordCheck")}
        placeholder="Confirme sua senha"
      />

      <InputIcon
        icon={faPhone}
        {...register("phone")}
        placeholder="Digite seu telefone"
      />

      <InputIcon
        icon={faIdCard}
        {...register("cpf")}
        placeholder="Digite seu CPF"
      />

      <ButtonContainer>
        <Button type="submit">cadastro</Button>

        <Button
          type="button"
          background={"white"}
          onClick={() => reset(registerDefaultValues)}
        >
          limpar
        </Button>
      </ButtonContainer>
    </FormStyled>
  );
};
