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

export function userLoader() {
  if (!isAuthenticated()) {
    throw redirect("/signin");
  }
  return getUser();
}