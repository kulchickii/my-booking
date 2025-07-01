import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://kgarwrxqyxfeuzofiduv.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnYXJ3cnhxeXhmZXV6b2ZpZHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NjQxODEsImV4cCI6MjA2NTA0MDE4MX0.XdpCEq-jasosmFSYx71AMXvKIH-7NVy11wa_RcbnpNI"

export const supabase = createClient(supabaseUrl, supabaseKey)