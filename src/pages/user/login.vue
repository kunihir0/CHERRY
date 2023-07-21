<script setup lang='ts'>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import appstore from "../../store";

const router = useRouter();

const email = ref("");
const password = ref("");
const feedback = ref("");
const success = ref(false);
const userStore = appstore.useUserStore;
const users = ref(null); // Define the users variable

const getAllUsers = async () => {
  try {
    const response = await axios.get("/api/user/all");
    users.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const submitForm = async () => {
  try {
    const response = await axios.post("/api/user/login", {
      email: email.value,
      password: password.value,
    });
    const data = response.data;
    console.log("submitForm response:", data);
    userStore.token = data.token;
    userStore.user = data.user;
    feedback.value = "Login successful!";
    success.value = true;
    router.push({ name: "Home" });
  } catch (error) {
    if (error.response) {
      feedback.value = "An error occurred. Please try again.";
    } else {
      feedback.value = "An error occurred. Please try again.";
    }
    success.value = false;
  }
  setTimeout(() => {
    feedback.value = "";
  }, 5000);
};
</script>

<template>
  <div class="max-w-screen-md mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">
      Login
    </h1>
    <div class="card bordered">
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <!-- form inputs here -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input v-model="email" type="email" class="input input-bordered">
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input v-model="password" type="password" class="input input-bordered">
          </div>
          <button type="submit" class="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
    <div v-if="feedback" class="toast fixed bottom-0 right-0 m-8 w-full max-w-sm mb-10">
      <div
        :class="[success ? 'alert-success' : 'alert-error']"
        class="alert flex flex-row items-center bg-white rounded shadow-md p-4 mb-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
      >
        {{ feedback }}
      </div>
    </div>
    <!-- ... -->
    <div class="card bordered mt-4">
      <div class="card-body">
        <h2 class="text-lg font-bold mb-2">
          Debug
        </h2>
        <button class="btn btn-secondary" @click="getAllUsers">
          Get All Users
        </button>
        <pre v-if="users">{{ users }}</pre>
      </div>
    </div>
    <!-- ... -->
  </div>
</template>

<style scoped>
.toast {
  animation: toast-in-right 0.7s;
}

@keyframes toast-in-right {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}
</style>
