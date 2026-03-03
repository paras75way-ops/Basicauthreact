import { redirect } from "react-router";
import { isAuthenticated, getUser } from "../services/auth.service";

export function requireAuth() {
  if (!isAuthenticated()) {
    throw redirect("/signin");
  }
  return null;
}

export function requireGuest() {
  if (isAuthenticated()) {
    throw redirect("/dashboard");
  }
  return null;
}

 export async function userLoader() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw redirect("/signin");
  }

  const user = await getUser();

  if (!user) {
    localStorage.removeItem("accessToken");
    throw redirect("/signin");
  }

  return user;
}