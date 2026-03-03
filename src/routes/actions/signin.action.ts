import { redirect } from "react-router";
import { login } from "../../services/auth.service";

export async function signInAction({ request }: { request: Request }) {
  const formData = await request.formData();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const data = await login(email, password);


    localStorage.setItem("accessToken", data.accessToken);

    return redirect("/dashboard");
  } catch (error) {
    return { error: "Invalid email or password" };
  }
}