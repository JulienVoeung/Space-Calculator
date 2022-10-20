<script setup>
import { defineComponent, computed } from "vue";
import CounterComponent from "../components/CounterComponent.vue";
import CountersTotal from "../components/CountersTotal.vue";
import useAuthUser from "src/composables/UseAuthUser";
import { state } from "../stores/countersState";
import CreateImportCounter from "../components/CreateImportCounter.vue";
import useSupabase from "src/boot/supabase";

defineComponent({
  name: "IndexPage",
});

const { user } = useAuthUser();
const { supabase } = useSupabase();
const { isSignedIn } = useAuthUser();

// fetch all existing counters for the logged in user
if (isSignedIn.value){
  state.fetchAllUserCounters(user.value.id, supabase);
}

// monitor counters count
const keys = computed(() => Object.keys(state.counters));
</script>

<template lang="pug">
q-page.column
  div(v-if="user")
    span.row.flex.flex-center
      CreateImportCounter
    .row.justify-center.items-start.q-my-xl
      span.row.flex.flex-center(v-if="state.fetchResult.length > 0")
        p {{ state.addCounter(state.fetchResult[0].name) }} {{ state.setVal(state.fetchResult[0].name, state.fetchResult[0].value) }} {{ state.fetchResult.shift() }}
      span.row.flex.flex-center(v-for="val in keys")
        p(v-if="state.isRemoved.includes(val.toString())")
          // do nothing
        p(v-else)
          CounterComponent
          p {{ state.addDisplayed(val.toString()) }}
      span.row.justify-center.items-start(v-if="keys.length > 0")
        span.text-h4.text-purple-9.q-my-md   =
        CountersTotal
      span.row.justify-center.items-start(v-else)
        h4.flex.lex-center.text-deep-purple-7.q-mx-xl No counters has been created or imported.
  div(v-else)
    h4.flex.lex-center.text-deep-purple-7.q-mx-xl You are not logged in !
</template>
