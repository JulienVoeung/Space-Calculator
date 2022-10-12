<script setup>
import { defineComponent, ref } from 'vue'
import CounterComponent from '../components/CounterComponent.vue'
import CountersTotal from '../components/CountersTotal.vue'
import useAuthUser from 'src/composables/UseAuthUser'

defineComponent({
  name: 'IndexPage'
})

const { user } = useAuthUser()
</script>

<template lang="pug">
q-page.column
  //p(v-if="!!user").q-ma-lg.text-h6.text-purple-9.flex.flex-center Hello {{ user.user_metadata.name }}
  //p.q-ma-lg Hello {{ user }}
  .row.justify-center.items-start.q-my-xl
    span.row.flex.flex-center
      CounterComponent(id="A")
    span.row.justify-center.items-start
      span.text-h4.text-purple-9.q-my-md +
      CounterComponent(id="B")
    span.row.justify-center.items-start
      span.text-h4.text-purple-9.q-my-md   =
      CountersTotal
</template>
