import { redirect } from "react-router";
import { login } from "../../services/auth.service";
import { store } from "../../store";
import { loginSuccess } from "../../store/slices/auth.slice";

export async function signInAction({ request }: { request: Request }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    throw new Response("Invalid data", { status: 400 });
  }

  const user = login(email, password);

  store.dispatch(loginSuccess(user));

  return redirect("/dashboard");
}