"use client";

import { InputIcon } from "@/components/input";
import {
  loginDefaultValues,
  loginSchema,
  LoginSchemaProps,
} from "@/schemas/auth/login";
import { LoginRequestDTO } from "@/types/dto/user/loginRequestDTO";
import {
  faChildReaching,
  faLock,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { BtnNavigate, Button } from "@/components/button";
import { useRouter, useSearchParams } from "next/navigation";
import { ButtonContainer, FormStyled } from "..";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LoginFormProps {
  submitFn: (request: LoginRequestDTO) => Promise<void>;
}

export const LoginForm = ({ submitFn }: LoginFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { reset, register, handleSubmit } = useForm<LoginSchemaProps>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  const onSubmit = (request: LoginSchemaProps) => {
    const params = new URLSearchParams();

    const productId = searchParams.get("productId");
    if (productId) params.append(productId, productId);

    router.replace(`${window.location.pathname}?${params.toString()}`);

    submitFn(request);
  };

  const onError = (errors: FieldErrors<LoginSchemaProps>) => {
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        toast.error(error.message);
      }
    });
  };

  const handleNavigate = (navigate: string) => {
    const params = new URLSearchParams();

    const productId = searchParams.get("productId");
    if (productId) params.append(productId, productId);

    router.push(`${navigate}?${params.toString()}`);
  };

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit, onError)}>
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

      <BtnNavigate
        underline
        color="var(--orange-low)"
        onClick={() => handleNavigate("/auth/register")}
        aria-label="Cadastro"
      >
        <FontAwesomeIcon icon={faChildReaching} />
        ainda não tenho cadastro!
      </BtnNavigate>

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
    </FormStyled>
  );
};
