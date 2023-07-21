import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export const useUserStore = defineStore("user", () => {
  const savedToken = useLocalStorage("token", "");
  const savedUserId = useLocalStorage("uId", "");
  const savedUserEmail = useLocalStorage("uEmail", "");
  const savedUserFirstName = useLocalStorage("uFirstName", "");
  const savedUserLastName = useLocalStorage("uLastName", "");

  const token = ref(savedToken.value);
  const user = ref({
    id: savedUserId.value,
    email: savedUserEmail.value,
    firstName: savedUserFirstName.value,
    lastName: savedUserLastName.value,
  });
  const isAuthenticated = computed(() => !!token.value);

  watch(token, (newToken) => {
    console.log("token updated:", newToken);
    savedToken.value = newToken;
  });

  watch(user, (newUser) => {
    console.log("user updated:", newUser);
    if (newUser) {
      savedUserId.value = newUser.id;
      savedUserEmail.value = newUser.email;
      savedUserFirstName.value = newUser.firstName;
      savedUserLastName.value = newUser.lastName;
    } else {
      savedUserId.value = null;
      savedUserEmail.value = "";
      savedUserFirstName.value = "";
      savedUserLastName.value = "";
    }
  });

  return {
    token,
    user,
    isAuthenticated,
  };
});
