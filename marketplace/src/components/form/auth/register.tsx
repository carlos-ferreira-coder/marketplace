import { Button } from "@/components/button";
import { InputIcon } from "@/components/input";
import {
  registerDefaultValues,
  registerSchema,
  registerSchemaProps,
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
import { ButtonContainer, Form } from ".";

interface RegisterFormProps {
  register: (request: RegisterRequestDTO) => Promise<void>;
}

export const RegisterForm = ({ register: registerUser }: RegisterFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { reset, register, handleSubmit } = useForm<registerSchemaProps>({
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  });

  const onSubmit = (request: registerSchemaProps) => {
    const params = new URLSearchParams();

    const productId = searchParams.get("productId");
    if (productId) params.append(productId, productId);

    router.replace(`${window.location.pathname}?${params.toString()}`);

    registerUser(request);
  };

  const onError = (errors: FieldErrors<RegisterRequestDTO>) => {
    if (errors.name) toast.error(errors.name.message);
    if (errors.email) toast.error(errors.email.message);
    if (errors.password) toast.error(errors.password.message);
    if (errors.phone) toast.error(errors.phone.message);
    if (errors.cpf) toast.error(errors.cpf.message);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
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
    </Form>
  );
};
