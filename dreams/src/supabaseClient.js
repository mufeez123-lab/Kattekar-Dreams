import { createClient } from '@supabase/supabase-js'

// Vite uses import.meta.env instead of process.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase credentials missing! Check your .env file.")
}

export const supabase = createClient(supabaseUrl, supabaseKey)