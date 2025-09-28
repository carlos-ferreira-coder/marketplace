import { InputIcon } from "@/components/input";
import {
  loginDefaultValues,
  loginSchema,
  loginSchemaProps,
} from "@/schemas/auth/login";
import { LoginRequestDTO } from "@/types/dto/user/loginRequestDTO";
import { faLock, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";

interface LoginFormProps {
  login: (request: LoginRequestDTO) => Promise<void>;
}

export const LoginForm = ({ login }: LoginFormProps) => {
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchemaProps>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  return (
    <form onSubmit={handleSubmit(login)}>
      <InputIcon icon={faUserTie} {...register("email")} />
      {errors.email && toast.error(errors.email.message)}

      <InputIcon icon={faLock} {...register("password")} />
      {errors.password && toast.error(errors.password.message)}
    </form>
  );
};
