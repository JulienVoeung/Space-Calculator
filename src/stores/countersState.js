import { reactive } from "vue";
import { Notify } from 'quasar'

export const state = reactive({
  // Declare dictionary to store IDs as keys and values as values
  counters: {},
  isShared: {},
  isSynced: {},
  isDisplayed: [],
  isRemoved: [],
  fetchResult: [],
  lastCreated: "",

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

  addCounter(id, isSynced = false) {
    if (id == ''){
      Notify.create({message: `You must specify a counter name.`, group:"true", type:"negative", progress:true, closeBtn:true, timeout: 3000})
      return;
    }
    if(this.isRemoved.includes(id)){
      this.renew(id, isSynced);
      Notify.create({message: `Counter '${id}' has been successfully created.`, group:"true", type:"positive", progress:true, closeBtn:true, timeout: 2000})
      return;
    }
    if(this.isDisplayed.includes(id)){
      Notify.create({message: `Counter '${id}' already exist.`, group:"true", type:"info", progress:true, closeBtn:true, timeout: 2000})
      return;
    }
    this.counters[id] = 0;
    this.isSynced[id] = isSynced;
    this.lastCreated = id;
    Notify.create({message: `Counter '${id}' has been successfully created.`, group:"true", type:"positive", progress:true, closeBtn:true, timeout: 2000})
  },

  renew(id, isSynced){
    let index = this.isRemoved.findIndex(value => value === id)
    this.isRemoved.splice(index, 1)
    this.lastCreated = id;
    this.isSynced[id] = isSynced;
  },

  addShared(id) {
    this.isShared[id] = true;
  },

  deleteCounter(id) {
    let index = this.isDisplayed.indexOf(id);
    this.isDisplayed.splice(index, 1);
    this.isRemoved.push(id);
    this.counters[id] = 0;
    delete this.isSynced[id];
  },

  addDisplayed(id){
    if(!this.isDisplayed.includes(id)){
    this.isDisplayed.push(id);
    }
  },

  async fetchAllUserCounters(userId, supabaseInterface){
    let { data, error } = await supabaseInterface
    .from('counters')
    .select('*')
    .match({ owner: userId });
    if (error) throw error;
    this.fetchResult = data;
    // Keep the creation order - sort by creation time
    this.fetchResult.sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));
  },

  signOutCleaning(){
    this.counters = Object.create(null);
    this.isShared = Object.create(null);
    this.isSynced = Object.create(null);
    this.isDisplayed = [];
    this.isRemoved = [];
    this.fetchResult = [];
    this.lastCreated = "";
  },

  getTotal(){
    var total = 0;
    for(var key in this.counters) {
      total += this.counters[key];
    }
    return total;
  },
})
