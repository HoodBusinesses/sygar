import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import { Button } from "./ui/button";
import CostumInputItem from "./ui/custom-input-item";
import { resetPassSchema } from "@/lib/schema/schema";

type Props = {
  isPending: boolean;
  isError: boolean;
  mutate: (params: { newPassword: string }) => void;
};

export default function ResetPassForm({ isPending, isError, mutate }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(resetPassSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    mutate({ newPassword: data.password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CostumInputItem
        id="password"
        type="password"
        label={"New Password"}
        placeholder={"Enter your new password"}
        register={register("password")}
        isPending={isPending}
        error={errors.password?.message?.toString()}
      />
      <CostumInputItem
        id="confirmPassword"
        type="password"
        label={"Confirm Password"}
        placeholder={"Confirm your new password"}
        register={register("confirmPassword")}
        isPending={isPending}
        error={errors.confirmPassword?.message?.toString()}
      />

      <Button
        type="submit"
        className={cn(
          "w-full bg-blue-600 hover:bg-blue-900 flex justify-center items-center"
        )}
        disabled={isPending}
      >
        {isPending ? (
          <FiLoader className="animate-spin text-white w-6 h-6" />
        ) : (
          "Reset Password"
        )}
      </Button>
    </form>
  );
}
