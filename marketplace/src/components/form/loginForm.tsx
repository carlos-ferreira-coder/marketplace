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
import styled from "styled-components";
import { Button } from "@/components/button";
import { useRouter, useSearchParams } from "next/navigation";

interface LoginFormProps {
  login: (request: LoginRequestDTO) => Promise<void>;
}

const Form = styled.form``;

export const LoginForm = ({ login }: LoginFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { reset, register, handleSubmit } = useForm<loginSchemaProps>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  const onSubmit = (request: loginSchemaProps) => {
    login(request);

    const params = new URLSearchParams();

    const productId = searchParams.get("productId");
    if (productId) params.append(productId, productId);

    router.replace(`${window.location.pathname}?${params.toString()}`);
  };

  const onError = (errors: FieldErrors<LoginRequestDTO>) => {
    if (errors.email) toast.error(errors.email.message);
    if (errors.password) toast.error(errors.password.message);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <InputIcon icon={faUserTie} {...register("email")} />
      <InputIcon icon={faLock} {...register("password")} />

      <div>
        <Button
          type="button"
          background={"white"}
          onClick={() => reset(loginDefaultValues)}
        >
          limpar
        </Button>

        <Button type="submit" background={"info"}>
          login
        </Button>
      </div>
    </Form>
  );
};
