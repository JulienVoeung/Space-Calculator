import { createClient } from "@supabase/supabase-js";
import useAuthUser from "src/composables/UseAuthUser";

const supabaseUrl = "https://sejhhcujibvwskoqibee.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlamhoY3VqaWJ2d3Nrb3FpYmVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU0Nzc0MTEsImV4cCI6MTk4MTA1MzQxMX0.5UIWNTeRjpWbKPk4inPLsBy0Civ_EUOoDtsGNoEJpKo";
const supabase = createClient(supabaseUrl, supabaseKey);

// console.log('init supabase:', supabase)
supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser();
  user.value = session?.user || null;
});

export default function useSupabase() {
  return { supabase };
}
