import { ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import useSupabase from "src/boot/supabase";
import { state } from "src/stores/countersState";

export default function useAPI(letter) {
  const { supabase } = useSupabase();
  const { user } = useAuthUser();

  const syncToServer = async () => {
    const counterValue = state.getVal(letter);
    const { data, error } = await supabase
      .from("counters")
      .update({ counter: counterValue })
      .match({ letter: letter, user: user.value.id });
    if (error) throw error;
  };

  const syncFromServer = async () => {
    //let counterValue = null;
    const { data, error } = await supabase
      .from("counters")
      .select('counter')
      .match({ letter: letter, user: user.value.id });
    if (error) throw error;
    if (data && data.length === 1) {
      state.setVal(letter, data[0].counter);
    }
  };

  return {
    syncFromServer,
    syncToServer,
  }
}
