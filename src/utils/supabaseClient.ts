import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rabmjybefaongwetsclx.supabase.co"; // your Supabase URL
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYm1qeWJlZmFvbmd3ZXRzY2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4ODMwNDAsImV4cCI6MjA2NDQ1OTA0MH0.jr9ze_9SBIbtGXG13nUGGPw4HUb3TY0jBJknHdmxSDI"; // your anon public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);