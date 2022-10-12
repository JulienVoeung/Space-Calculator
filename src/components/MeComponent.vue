<script setup>
import { defineComponent, defineAsyncComponent } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'

defineComponent({
  name: 'MeComponent',
  components: {
    CardDashboard: defineAsyncComponent(() => import('components/CardDashbaord.vue'))
  }
})

const { user } = useAuthUser()
</script>

<template lang="pug">
// div(v-if="user") Hello {{ user.user_metadata.name }}
//.row.q-col-gutter-md
  .col-md-4.col-xs-12.col-sm-6
    card-dashboard(
      table="category",
      label="Categories",
      icon="mdi-shape-outline"
      )
  .col-md-4.col-xs-12.col-sm-6
    card-dashboard(
      table="product",
      label="Products",
      icon="mdi-archive"
      )
</template>



