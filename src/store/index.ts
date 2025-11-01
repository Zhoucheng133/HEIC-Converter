import { defineStore } from "pinia";
import { ref } from "vue";
export default defineStore("store", ()=>{
  let path=ref("");
  return { path };
})