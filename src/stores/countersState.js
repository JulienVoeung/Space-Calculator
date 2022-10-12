import { reactive } from "vue"

export const state = reactive({
  counterA: 0,
  counterB: 0,

  getVal(id) {
    if (id === "A") {
      return this.counterA;
    } else if (id === "B") {
      return this.counterB;
    } else {
      console.log("Attempting to get a non-existing counter");
      return 0;
    }
  },

  setVal(id, value) {
    if (id === "A") {
      this.counterA = value
      return this.counterA
    } else if (id === "B") {
      this.counterB = value
      return this.counterB
    } else {
      console.log("Attempting to set a non-existing counter");
      return 0;
    }
  },

  incr(id) {
    if (id === "A") {
      this.counterA++;
    } else if (id === "B") {
      this.counterB++;
    } else console.log("Attempting to increment a non-existing counter");
  },

  decr(id) {
    if (id === "A") {
      this.counterA--;
    } else if (id === "B") {
      this.counterB--;
    } else console.log("Attempting to decrement a non-existing counter");
  },
})
