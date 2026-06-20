import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://rfeozlrpkbuxrpkzhkyz.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmZW96bHJwa2J1eHJwa3poa3l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5MzQxMDcsImV4cCI6MjA5NzUxMDEwN30.N0O02_32fdDzVXYJ1fQXCQ58w71mZZNW7cdgT4rGy28"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)