import type { IUser } from "../types/auth";

export function login(email: string, _password: string): IUser {
  // fake login
  const user: IUser = {
    id: crypto.randomUUID(),
    email,
  };
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

export function signup(email: string, _password: string): IUser {
  const user: IUser = {
    id: crypto.randomUUID(),
    email,
  };
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

export function logouts() {
  localStorage.removeItem("user");
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem("user");
}

export function getUser(): IUser | null {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr) as IUser;
  } catch {
    return null;
  }
}