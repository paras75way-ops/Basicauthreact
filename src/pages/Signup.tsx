import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import { signup } from "../services/auth.service";
import { useState } from "react";

type SignUpFormData = {
  role: string;
  name: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>();

  const navigate = useNavigate();

  const [serverError, setServerError] = useState<string | null>(null);
  const [successEmail, setSuccessEmail] = useState<string | null>(null);

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setServerError(null);

      await signup(
        data.role,
        data.name,
        data.email,
        data.password
      );

      // ✅ DO NOT auto login
      setSuccessEmail(data.email);

    } catch (error: any) {
      setServerError(error.message || "Signup failed");
    }
  };

  /* ================= SUCCESS SCREEN ================= */

  if (successEmail) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4
                      bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md bg-white dark:bg-gray-800
                        rounded-2xl shadow-xl p-8 text-center">

          <h2 className="text-2xl font-semibold mb-4
                         text-gray-800 dark:text-gray-100">
            Verify Your Email
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            We’ve sent a verification link to <br />
            <span className="font-medium">{successEmail}</span>
          </p>

          <p className="text-xs text-gray-500 mb-6">
            Please check your inbox and click the link to activate your account.
          </p>

          <button
            onClick={() => navigate("/signin")}
            className="w-full py-2.5 rounded-lg
                       bg-black dark:bg-gray-200
                       text-white dark:text-gray-900
                       font-medium hover:opacity-90 transition"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  /* ================= FORM ================= */

  return (
    <div className="flex items-center justify-center min-h-screen px-4
                    bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800
                      rounded-2xl shadow-xl p-8">

        <h2 className="text-2xl font-semibold text-center mb-6
                       text-gray-800 dark:text-gray-100">
          Create Account
        </h2>

        {serverError && (
          <div className="mb-4 text-sm text-red-600 text-center">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Role */}
          <div>
            <label className="block text-sm mb-1
                              text-gray-700 dark:text-gray-300">
              Role
            </label>
            <select
              {...register("role", { required: "Role is required" })}
              className="w-full p-2.5 rounded-lg border
                         bg-white dark:bg-gray-700
                         border-gray-300 dark:border-gray-600"
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">
                {errors.role.message}
              </p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm mb-1
                              text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2.5 rounded-lg border
                         bg-white dark:bg-gray-700
                         border-gray-300 dark:border-gray-600"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1
                              text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              className="w-full p-2.5 rounded-lg border
                         bg-white dark:bg-gray-700
                         border-gray-300 dark:border-gray-600"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1
                              text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
                validate: (value) =>
                  /[A-Z]/.test(value) ||
                  "Must include at least one uppercase letter",
              })}
              className="w-full p-2.5 rounded-lg border
                         bg-white dark:bg-gray-700
                         border-gray-300 dark:border-gray-600"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 rounded-lg
                       bg-black dark:bg-gray-200
                       text-white dark:text-gray-900
                       font-medium hover:opacity-90 transition"
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center
                      text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/signin" className="font-medium underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}