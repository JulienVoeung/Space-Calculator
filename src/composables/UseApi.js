import useAuthUser from "src/composables/UseAuthUser";
import useSupabase from "src/boot/supabase";
import { state } from "src/stores/countersState";

export default function useAPI(letter) {
  const { supabase } = useSupabase();
  const { user } = useAuthUser();

  const syncToServer = async () => {
    const counterValue = state.getVal(letter);
    const { data, error } = await supabase
    .from('counters')
    .insert([
      { owner: user.value.id, name: letter, value: counterValue},
    ])
    if (error){
      if (error.code == 23505){ // means if this counter already exists
        const { data, error } = await supabase
        .from('counters')
        .update({ value: counterValue })
        .eq('name', letter)
        .eq('owner', user.value.id);
        if (error) throw error;
        return;
      }
      else{
        throw error;
      }
    }
    state.isSynced[letter] = true;
  };

  const syncFromServer = async () => {
    const { data, error } = await supabase
      .from("counters")
      .select('value')
      .match({ name: letter, owner: user.value.id });
    if (error) throw error;
    if (data && data.length === 1) {
      state.setVal(letter, data[0].value);
    }
  };

  const getCounterId = async (letter) => {
    const { data, error } = await supabase
      .from("counters")
      .select('counter_id')
      .match({ name: letter, owner: user.value.id });
      if (error) throw error;
      if (!(data.length > 0)) return "This counter has not been synced yet.";
    return data[0].counter_id;
    };


  const deleteCounter = async (letter) => {
    const { data, error } = await supabase
      .from("counters")
      .delete()
      .match({ name: letter, owner: user.value.id });
      if (error) throw error;
    };

    return {
      syncFromServer,
      syncToServer,
      getCounterId,
      deleteCounter,
    }
  }
