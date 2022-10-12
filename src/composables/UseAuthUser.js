import { ref, computed } from "vue";
import useSupabase from "boot/supabase";

// user is set outside of the useAuthUser function
// so that it will act as global state and always refer to a single user
const user = ref(null);

export default function useAuthUser() {
  const { supabase } = useSupabase();

  // signin with email and password
  const signIn = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) throw error;
    return user;
  };

  // signin with social network account such as google, github, etc
  // const signInWithSocialProvider = async (provider) => {
  //   const { user, error } = await supabase.auth.signIn({ provider })
  //   if (error) throw error
  //   return user
  // }

  // Logout
  const signOut = async () => {
    const oldUser = user.value;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return oldUser;
  };

  // Determine whether the user is logged in
  const isSignedIn = computed(() => !!user.value);

  // Signup
  const signUp = async ({ email, password, ...meta }) => {
    const { user, error } = await supabase.auth.signUp(
      { email, password },
      {
        // arbitrary meta data is passed as the second argument under a data key
        // to the Supabase signUp method
        data: meta,
        // the to redirect to after the user confirms their email
        // window.location wouldn't be available if we were rendering server side
        // but since we're all on the client it will work fine
        //redirectTo: `${window.location.origin}/`
        redirectTo: "/",
      }
    );
    if (error) throw error;
    return user;
  };

  return {
    isSignedIn,
    signIn,
    signOut,
    signUp,
    user,
  };
}
