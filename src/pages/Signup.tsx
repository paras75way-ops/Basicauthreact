import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { signup } from "../services/auth.service";
import { loginSuccess } from "../store/slices/auth.slice";
import { useAppDispatch } from "../store/hooks";
import type { ISignUpForm } from "../types/auth";

export default function SignUp() {
  const { register, handleSubmit, watch, formState } = useForm<ISignUpForm>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function onSubmit(data: ISignUpForm) {
    const user = signup(data.email, data.password);
    dispatch(loginSuccess(user));
    navigate("/dashboard");
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6
                   bg-white dark:bg-gray-800
                   border border-gray-200 dark:border-gray-700
                   rounded-xl p-8 shadow-sm"
      >
        <h2 className="text-2xl font-semibold text-center">
          Sign Up
        </h2>

        {/* Email */}
        <div className="space-y-1">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email required" })}
            className="w-full rounded-lg border px-4 py-2 text-sm
                       border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-900
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formState.errors.email && (
            <p className="text-sm text-red-500">
              {formState.errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password required" })}
            className="w-full rounded-lg border px-4 py-2 text-sm
                       border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-900
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formState.errors.password && (
            <p className="text-sm text-red-500">
              {formState.errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              validate: (v) =>
                v === watch("password") || "Passwords do not match",
            })}
            className="w-full rounded-lg border px-4 py-2 text-sm
                       border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-900
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formState.errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {formState.errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-2 text-sm font-medium
                     text-white hover:bg-blue-700
                     transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}