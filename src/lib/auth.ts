import { supabase } from "./supabase";

export type AuthUser = {
  id: string;
  email: string;
  full_name?: string;
  role?: string;
};

export type SignUpCredentials = {
  email: string;
  password: string;
  full_name: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export const signUp = async ({
  email,
  password,
  full_name,
}: SignUpCredentials) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        role: "user", // Default role for new users
      },
    },
  });

  if (error) throw error;
  return data;
};

export const login = async ({ email, password }: LoginCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async (): Promise<AuthUser | null> => {
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;

  return {
    id: data.user.id,
    email: data.user.email || "",
    full_name: data.user.user_metadata?.full_name,
    role: data.user.user_metadata?.role,
  };
};

export const isAdmin = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  return user?.role === "admin";
};

// Set up auth state change listener
export const setupAuthListener = (
  callback: (user: AuthUser | null) => void,
) => {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_IN" || event === "USER_UPDATED") {
      if (session?.user) {
        const user: AuthUser = {
          id: session.user.id,
          email: session.user.email || "",
          full_name: session.user.user_metadata?.full_name,
          role: session.user.user_metadata?.role,
        };
        callback(user);
      }
    } else if (event === "SIGNED_OUT") {
      callback(null);
    }
  });
};
