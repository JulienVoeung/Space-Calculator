<script setup>
import { defineComponent, computed, ref } from "vue";
import { state } from "../stores/countersState";
import useAuthUser from "src/composables/UseAuthUser";
import useAPI from "src/composables/UseApi";

const props = defineProps({
  id: {
    required: true,
    validator(value) {
      return value;
    },
  },
});

defineComponent({ name: "CounterComponent" });

const { isSignedIn } = useAuthUser();

// if props.id is defined, use it, if not, use the counters
const id =  props.id == null ? state.lastCreated : props.id;
const isShared = state.isShared[id] ? "*Shared Counter*" : 'Counter';

const { syncToServer, getCounterId, deleteCounter, syncFromServer } = useAPI(id);
const alert = ref(false);

const isSynced = computed(() => state.isSynced[id]);

async function counterId(letter) {
  document.getElementById("counterIdField").innerHTML = await getCounterId(letter);
}
</script>

<template lang="pug">
.column.justify-evenly
  p.q-ma-md.text-h5.text-purple-9.self-center.row
    p.q-mt-md.q-mr-md {{isShared + " " + id }}
    q-btn.q-ma-xs.q-pa-xs.q-px-md(
          color="red",
          rounded,
          dense,
          :disabled="!isSignedIn",
          no-caps,
          size="0.5em",
          icon="delete",
          label="Delete"
          @click = "state.deleteCounter(id); deleteCounter(id)"
          )
          q-tooltip(anchor="bottom left").bg-teal Delete counter
  .row.justify-center.items-end
    q-btn.q-ma-md.col-1(rounded, color="blue", @click="state.incr(id)", :disabled="state.isShared[id]")
      q-tooltip(anchor="top left").bg-teal increment
      q-icon(name="arrow_drop_up", size="md")
    q-input.col-8(
      v-model="state.counters[id]",
      placeholder="Enter number",
      error-message = "Input must be a number",
      outlined,
      dense,
      rounded,
      input-class=" text-h5 text-center text-cyan",
      :rules="[val => (Number.isFinite(val)) || 'error']"
      )
      q-tooltip(anchor="bottom middle").bg-teal Enter number
      q-btn.q-ma-xs(
        :id="'reset_' + id",
        rounded,
        outline,
        dense,
        no-caps,
        @click="state.setVal(id, 0)"
        icon="clear",
        size="0.9em",
        )
    q-btn.q-ma-md.col-1(rounded, color="blue", @click="state.decr(id)", :disabled="state.isShared[id]")
      q-tooltip(anchor="top right").bg-teal decrement
      q-icon(name="arrow_drop_down", size="md")
  .row.justify-center
    .column.col-3
      q-btn.q-ma-xs.bg-orange-5(
        rounded,
        :disabled="!isSignedIn || state.isShared[id] || !isSynced",
        dense,
        no-caps,
        size="1em",
        icon="share",
        @click = "alert = true"
        )
        q-tooltip(anchor="bottom right").bg-teal Share counter
        q-dialog(v-model='alert')
          q-card
            q-card-section
              .text-h6 Share this counter
            q-card-section.q-pt-none
              | Share the below code with anyone so he can import your counter.
              q-field(filled='' label='Counter ID' stack-label='' id="counterIdField")
                template(v-slot:control)
                  .self-center.full-width.no-outline(tabindex='0') {{ counterId(id) }}
            q-card-actions(align='right')
              q-btn(flat='' label='OK' color='primary' v-close-popup='')
    .column.col-3(v-if="isSynced")
      q-btn.q-ma-xs.bg-green-7(
          rounded,
          :disabled="!isSignedIn || state.isShared[id]",
          dense,
          no-caps,
          size="1em",
          icon="cloud_upload",
          @click = "syncToServer"
          )
          q-tooltip(anchor="bottom left").bg-teal Update server value
    .column.col-3(v-else)
      q-btn.q-ma-xs.bg-orange-5(
          rounded,
          :disabled="!isSignedIn || state.isShared[id]",
          dense,
          no-caps,
          size="1em",
          icon="cloud_off",
          @click = "syncToServer"
          )
          q-tooltip(anchor="bottom left").bg-teal Click to sync with server
    .column.col-3(v-if="isSynced")
      q-btn.q-ma-xs.bg-green-7(
          rounded,
          :disabled="!isSignedIn || state.isShared[id]",
          dense,
          no-caps,
          size="1em",
          icon="cloud_download",
          @click = "syncFromServer"
          )
          q-tooltip(anchor="bottom left").bg-teal Get value from server
    .column.col-3(v-else)
      q-btn.q-ma-xs.bg-orange-5(
          rounded,
          :disabled="!isSignedIn || state.isShared[id] || !isSynced",
          dense,
          no-caps,
          size="1em",
          icon="cloud_download",
          @click = "syncFromServer"
          )
          q-tooltip(anchor="bottom left").bg-teal Get value from server
  .row.justify-center
    .column.col-2
      q-btn.q-ma-xs.bg-blue-6(
        :id="'save_' + id",
        rounded,
        dense,
        no-caps,
        @click="state.saveValueToLocalStorage(id)",
        icon="save",
        size="1em",
        )
        q-tooltip(anchor="bottom left").bg-teal Save to local storage
    .column.col-2
      q-btn.q-ma-xs.bg-blue-6(
        :id="'load_' + id",
        rounded,
        dense,
        no-caps,
        @click="state.getFromLocalStorage(id)",
        icon="settings_backup_restore",
        size="1em",
        )
        q-tooltip(anchor="bottom left").bg-teal Load from local storage
</template>
