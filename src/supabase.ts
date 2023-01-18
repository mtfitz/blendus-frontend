//import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
//import { SessionContextProvider } from '@supabase/auth-helpers-react';
//import { useState } from 'react';
import { Database } from './supabase.types';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL: string = process.env.REACT_APP_SUPABASE_URL!;
const SUPABASE_KEY: string = process.env.REACT_APP_SUPABASE_ANON_KEY!;

const client = createClient(SUPABASE_URL, SUPABASE_KEY);
//const client = createBrowserSupabaseClient<Database>();

//export { client as supabase };
export default client;

console.log(SUPABASE_KEY);