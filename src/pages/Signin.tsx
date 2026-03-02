import { Form, useSubmit } from "react-router";
import { useForm } from "react-hook-form";
import type { ISignInForm } from "../types/auth";

export default function SignIn() {
  const submit = useSubmit();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInForm>();

  function onSubmit(data: ISignInForm) {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    submit(formData, { method: "post" });
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <Form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6
                   bg-white dark:bg-gray-800
                   border border-gray-200 dark:border-gray-700
                   rounded-xl p-8 shadow-sm"
      >
        <h2 className="text-2xl font-semibold text-center">
          Sign In
        </h2>

        {/* Email */}
        <div className="space-y-1">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full rounded-lg border px-4 py-2 text-sm
                       border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-900
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full rounded-lg border px-4 py-2 text-sm
                       border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-900
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-2 text-sm font-medium
                     text-white hover:bg-blue-700
                     transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign In
        </button>
      </Form>
    </div>
  );
}