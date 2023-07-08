<script setup lang="ts">
const router = useRouter();

const testStore = () => {
  router.push({
    name: "StoreTest",
  });
};
</script>

<template>
  <div class="hero mt-[-4rem] min-h-screen text-primary-content">
    <div
      class="hero-overlay place-items-center bg-gradient-to-bl from-primary to-base-100"
    />
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">
          CHERRY
        </h1>
        <p class="mb-5">
          HOME OF THE TOOLS FOR TURTLE
        </p>
        <img src="../../../assets/1.jpg" width="250" height="250" class="mask mask-heart border border-amber rounded">

        <div class="flex flex-col w-full border-opacity-50">
          <button class="btn-primary btn" @click="testStore">
            Test Store
          </button>
          <div class="divider">
            OR
          </div>
          <RouterLink to="/tools">
            <button class="btn-primary btn">
              Tools
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
