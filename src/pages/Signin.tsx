import { Form, useActionData, useNavigation } from "react-router";
import { useForm } from "react-hook-form";

interface ISignInForm {
  email: string;
  password: string;
}

export default function SignIn() {
  const actionData = useActionData() as { error?: string } | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const {
    register,
    formState: { errors },
  } = useForm<ISignInForm>();

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <Form
        method="post"
        className="w-full max-w-md space-y-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-sm"
      >
        <h2 className="text-2xl font-semibold text-center">
          Sign In
        </h2>

        {/* Backend Error */}
        {actionData?.error && (
          <div className="text-sm text-red-600 text-center">
            {actionData.error}
          </div>
        )}

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 border rounded-md"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full p-2 border rounded-md"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-2 rounded-md disabled:opacity-50"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </Form>
    </div>
  );
}