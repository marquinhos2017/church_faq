import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zracdlxdljdzzedxgrqp.supabase.co'; // URL do seu projeto
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyYWNkbHhkbGpkenplZHhncnFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MTcyNTIsImV4cCI6MjA0NTE5MzI1Mn0.V_Kui3bw0yYcYtQO0BYdxA8Nc576NK1fxsohWb9whNc'; // Chave anônima do seu projeto

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
