<script setup>
import { defineComponent, ref } from "vue";
import { state } from "src/stores/countersState";
import useSupabase from "src/boot/supabase";
import useNotify from "src/composables/UseNotify";
import useAuthUser from "src/composables/UseAuthUser";

const { user } = useAuthUser();
const { notifyError, notifySuccess } = useNotify();

defineComponent({ name: "CreateCounter" });

const { supabase } = useSupabase();
const addCounterDialog = ref(false);
const importCounterDialog = ref(false);
const counterName = ref("");
const counterId = ref("");
const counterNameInput = ref(null);

const importCounter = async (counterId) => {
  if (counterId == "") {
    notifyError("You must specify a counter ID.");
    return;
  }
  const { data, error } = await supabase
    .from("counters")
    .select("*")
    .match({ counter_id: counterId });
  if (error) {
    if (error.code == "22P02") {
      notifyError(
        "This counter has not been found. Please verify the counter ID is correct."
      );
      return;
    } else throw error;
  }
  if (data[0].owner == user.value.id) {
    notifyError("You cannot import your own counter.");
    return;
  }
  if (state.isDisplayed.includes(data[0].name)) {
    notifyError("A counter with the name " + data[0].name + " already exists.");
    return;
  }
  state.addCounter(data[0].name);
  state.addShared(data[0].name);
  state.setVal(data[0].name, data[0].value);
  subscribe(data[0].name, counterId);
};

function subscribe(counterName, counterId) {
  console.log("Subscribe to counter " + counterName);
  const counters = supabase
    .from("counters:counter_id=eq." + counterId)
    .on("UPDATE", (payload) => {
      state.setVal(counterName, payload.new.value);
      console.log("Subscribe event: Counter " + counterName + " updated.");
    })
    .subscribe();
}
</script>

<template lang="pug">
.column.justify-evenly
  .row.justify-center
    .column
      .newcounter
        q-btn.q-ma-xs.q-pa-md.q-mr-xl(
          ref="counterNameInput"
          rounded,
          dense,
          no-caps,
          color = "blue",
          size="0.9em",
          icon="add",
          label="Create a new counter",
          @click="addCounterDialog = true",
          )
          q-tooltip(anchor="bottom left").bg-teal Create a new counter
          q-dialog(v-model='addCounterDialog' @before-hide="counterName=''")
            q-card(style='min-width: 350px')
              q-card-section
                .text-h6 Counter name
              q-card-section.q-pt-none
                q-input(v-model='counterName' autofocus=true @keyup.enter="state.addCounter(counterName) ; addCounterDialog = false")
              q-card-actions.text-primary(align='right')
                q-btn(label='Confirm' @click="state.addCounter(counterName)" v-close-popup='')
    .column
      q-btn.q-ma-xs.q-pa-md(
        rounded,
        dense,
        no-caps,
        color = "green",
        size="0.9em",
        icon="file_download",
        label="Import counter",
        @click = "importCounterDialog = true"
        )
        q-tooltip(anchor="bottom right").bg-teal Import counter
        q-dialog(v-model='importCounterDialog' @before-hide="counterId=''")
          q-card(style='min-width: 350px')
            q-card-section
              .text-h6 Counter ID
            q-card-section.q-pt-none
              q-input(v-model='counterId' autofocus=true @keyup.enter='importCounter(counterId); importCounterDialog = false')
            q-card-actions.text-primary(align='right')
              q-btn(label='Confirm' @click="importCounter(counterId)" v-close-popup='')
</template>
