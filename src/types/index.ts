export interface User {
  id: string;
  name?: string;
  email?: string;
}

// Re-export product types
export * from './product';
