<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import appstore from "../../../../store";

defineOptions({
  name: "User",
});

const userStore = appstore.useUserStore;
const showLogoutModal = ref(false);
const showToast = ref(false);
const router = useRouter();

const logout = () => {
  userStore.token = "";
  userStore.user = null;
  showLogoutModal.value = false;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
  router.push({ name: "Home" });
};
</script>

<template>
  <div v-if="userStore.isAuthenticated" class="flex-none">
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img src="https://i.pinimg.com/originals/46/26/d1/4626d147d80963d575908432b9a77449.jpg">
        </div>
      </label>
      <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li v-if="userStore.user">
          <RouterLink :to="{ name: 'Profile', params: { email: userStore.user.email } }">
            Profile
            <span class="badge">New</span>
          </RouterLink>
        </li>
        <li><a onclick="logout_modal.showModal()">Logout</a></li>
      </ul>
    </div>

    <dialog id="logout_modal" class="modal">
      <form method="dialog" class="modal-box">
        <h3 class="font-bold text-lg">
          Are you sure you want to logout?
        </h3>
        <div class="modal-action">
          <button class="btn btn-primary" @click.prevent="logout">
            Yes
          </button>
          <button class="btn" click.prevent="logout_modal.showModal()">
            No
          </button>
        </div>
      </form>
    </dialog>

    <div v-if="showToast" class="toast fixed bottom-0 right-0 m-8 w-full max-w-sm mb-10">
      <div
        class="alert alert-success flex flex-row items-center bg-white rounded shadow-md p-4 mb-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
      >
        You have been logged out.
      </div>
    </div>
  </div>
  <div v-else class="flex-none flex space-x-2">
    <RouterLink to="/user/login">
      <button class="btn ghost">
        Login
      </button>
    </RouterLink>
    <RouterLink to="/user/register">
      <button class="btn btn-secondary">
        Sign Up
      </button>
    </RouterLink>
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
