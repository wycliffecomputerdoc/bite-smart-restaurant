// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vgvuunhsecsuyjzgzadz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZndnV1bmhzZWNzdXlqemd6YWR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MzczMDEsImV4cCI6MjA2NTMxMzMwMX0.1CcHra5bkEmcpaXVlcFcyE8tX-A9dyT1FXi8tkCYYts";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);