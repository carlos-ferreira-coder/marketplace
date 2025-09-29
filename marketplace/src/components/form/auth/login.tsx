import { InputIcon } from "@/components/input";
import {
  loginDefaultValues,
  loginSchema,
  loginSchemaProps,
} from "@/schemas/auth/login";
import { LoginRequestDTO } from "@/types/dto/user/loginRequestDTO";
import { faLock, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/button";
import { useRouter, useSearchParams } from "next/navigation";
import { ButtonContainer, Form } from ".";
import { useState } from "react";

interface LoginFormProps {
  login: (request: LoginRequestDTO) => Promise<void>;
}

export const LoginForm = ({ login }: LoginFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { reset, register, handleSubmit } = useForm<loginSchemaProps>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  const onSubmit = (request: loginSchemaProps) => {
    const params = new URLSearchParams();

    const productId = searchParams.get("productId");
    if (productId) params.append(productId, productId);

    router.replace(`${window.location.pathname}?${params.toString()}`);

    login(request);
  };

  const onError = (errors: FieldErrors<LoginRequestDTO>) => {
    if (errors.email) toast.error(errors.email.message);
    if (errors.password) toast.error(errors.password.message);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <InputIcon
        icon={faUserTie}
        {...register("email")}
        placeholder="Digite seu email..."
      />
      <InputIcon
        icon={faLock}
        type="password"
        {...register("password")}
        placeholder="Digite sua senha..."
      />

      <ButtonContainer>
        <Button type="submit">login</Button>

        <Button
          type="button"
          background={"white"}
          onClick={() => reset(loginDefaultValues)}
        >
          limpar
        </Button>
      </ButtonContainer>
    </Form>
  );
};
