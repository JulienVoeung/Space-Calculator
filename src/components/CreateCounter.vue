<script setup>
import { defineComponent } from "vue";
import { state } from "src/stores/countersState";
import useSupabase from "src/boot/supabase";


defineComponent({ name: "CreateCounter" });

const { supabase } = useSupabase();

const pullFromCode = async (code) => {
    const { data, error } = await supabase
    .from('counters')
    .select('value')
    .match({counter_id: code});
    if (error) throw error;
    state.setVal('A', data[0].value);
  }

function subscribe() {
  console.log('Sub');
  const counters = supabase
  .from('counters')
  .on('*', payload => {
    state.setVal('A', payload.new.value);
    console.log('Subscribe event: Counter updated.')
  })
  .subscribe();
}
</script>

<template lang="pug">
.column.justify-evenly
  .row.justify-center
    .column.col-4
      q-btn.q-ma-xs(
        rounded,
        dense,
        no-caps,
        color = "red",
        size="0.9em",
        icon="add",
        label="Create a new counter",
        @click = "syncToServer"
        )
        q-tooltip(anchor="bottom left").bg-teal Create a new counter
    .column.col-5
      q-btn.q-ma-xs(
        rounded,
        dense,
        no-caps,
        color = "green",
        size="0.9em",
        icon="sync",
        label="Pull shared counters",
        @click = "pullFromCode('d841d966-238b-4acc-8d81-cf3d592e8c89'); subscribe()"
        )
        q-tooltip(anchor="bottom right").bg-teal Pull shared counters
</template>
