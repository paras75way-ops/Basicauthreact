import type { IUser } from "../types/auth";

const API_URL = "http://localhost:5000/api/auth";

 
export async function login(
  email: string,
  password: string
) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();  
}

export async function signup(
  role: string,
  name: string,
  email: string,
  password: string
) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ role, name, email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Signup failed");
  }

  return res.json(); 
}
export async function logouts(): Promise<void> {
  await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  localStorage.removeItem("accessToken");
}
export function isAuthenticated(): boolean {
  return !!localStorage.getItem("accessToken");
}
export async function getUser(): Promise<IUser | null> {
  const token = localStorage.getItem("accessToken");

  if (!token) return null;

  const res = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!res.ok) {
    return null;
  }

  const user = await res.json();

  return user as IUser;
}
 

export async function verifyEmail(token: string) {
  const res = await fetch(`${API_URL}/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Verification failed");
  }

  return data;
}