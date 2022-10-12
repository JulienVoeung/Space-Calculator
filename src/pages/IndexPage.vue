<script setup>
import { defineComponent, ref } from 'vue'
import CounterComponent from '../components/CounterComponent.vue';
import CountersTotal from '../components/CountersTotal.vue';
import useAuthUser from 'src/composables/UseAuthUser';
import CreateCounter from 'src/components/CreateCounter.vue';

defineComponent({
  name: 'IndexPage'
})

const { user } = useAuthUser()
</script>

<template lang="pug">
q-page.column
  div(v-if="user")
    CreateCounter
    .row.justify-center.items-start.q-my-xl
      span.row.flex.flex-center
        CounterComponent(id="A")
      span.row.justify-center.items-start
        span.text-h4.text-purple-9.q-my-md   =
        CountersTotal
  div(v-else)
    h4.flex.flex-center.text-deep-purple-7.q-mx-xl You are not logged in !
</template>
