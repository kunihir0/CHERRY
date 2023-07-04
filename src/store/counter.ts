import { defineStore } from "pinia";

export const counter = defineStore("counter", () => {
  const count = ref<number>(0);
  function increment() {
    count.value++;
  }

  return { count, increment };
});
