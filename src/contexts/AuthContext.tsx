import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';
import { supabaseAuth } from '@/lib/supabase/supabaseClientAuth';
import type { Session, AuthError } from '@supabase/supabase-js';

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ data: Session | null; error: AuthError | null }>;
  signup: (email: string, password: string, name: string) => Promise<{ data: Session | null; error: AuthError | null }>;
  logout: () => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Supabase auth state listener
  useEffect(() => {
    const { data: { subscription } } = supabaseAuth.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        // Map Supabase user to your User type
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || '',
          // ...other fields as needed
        } as User);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    return await supabaseAuth.auth.signInWithPassword({ email, password });
  };

  const signup = async (email: string, password: string, name: string) => {
    const { data, error } = await supabaseAuth.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    });
    
    return { data, error };
  };

  const logout = async () => {
    return await supabaseAuth.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
