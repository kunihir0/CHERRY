<script setup lang="ts">
defineOptions({
  name: "User",
});

const router = useRouter();
</script>

<template>
  <div class="hero mt-[-4rem] min-h-screen text-primary-content">
    <div class="hero-overlay place-items-center bg-gradient-to-bl from-primary to-base-100" />
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">
          User Panel
        </h1>

        <div class="indicator">
          <span class="indicator-item badge">new</span>
          <RouterLink to="/user/register">
            <button class="btn-primary btn">
              Register
            </button>
          </RouterLink>
        </div>
        <div class="divider" />
        <div class="indicator">
          <span class="indicator-item badge">new</span>
          <RouterLink to="/user/login">
            <button class="btn-primary btn">
              Login
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
