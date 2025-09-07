// Centralized Supabase Client for Seftec.Store (B2C)
// Schema-aware client with optimized configurations

import { createClient } from '@supabase/supabase-js';

// Client-side Supabase client for retail_b2c schema
export function createRetailClient() {
  return createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    {
      db: { schema: 'retail_b2c' },
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    }
  );
}

// Admin client with service role key for retail_b2c schema
export function createRetailAdminClient() {
  return createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY,
    {
      db: { schema: 'retail_b2c' },
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

// Cross-schema client for accessing B2B data when needed
export function createCrossSchemaClient() {
  return createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

// Utility functions for common operations
export const retailHelpers = {
  // Get client for specific operations
  getClient: () => {
    return createRetailClient();
  },

  // Validate schema exists
  validateSchema: async () => {
    try {
      const client = createRetailAdminClient();
      const { data, error } = await client
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'retail_b2c')
        .limit(1);
      
      return !error;
    } catch (error) {
      return false;
    }
  },
};