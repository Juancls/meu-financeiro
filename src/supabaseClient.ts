import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lbnjohkoqqqbfiwgtfta.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_NvA1Efn5PmLID6MBOWq7wQ_kvPIJhaU';

export const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;