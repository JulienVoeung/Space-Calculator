import { reactive } from "vue"

export const state = reactive({
  // Declare dictionary to store IDs as keys and values as values
  counters: {},

  getVal(id) {
    return this.counters[id];
  },

  setVal(id, value) {
    this.counters[id] = value;
  },

  incr(id) {
    this.counters[id]++;
  },

  decr(id) {
    this.counters[id]--;
  },

  addCounter(id) {
    this.counters[id] = 0;
  },

  getTotal(){
    var total = 0;
    for(var key in this.counters) {
      total += this.counters[key];
    }
    return total;
  },
})
