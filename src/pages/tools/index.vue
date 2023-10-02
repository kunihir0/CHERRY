<script setup lang="ts">
defineOptions({
  name: "Tools",
});

const router = useRouter();

const ElectricCalculator = () => {
  router.push({
    name: "Electric",
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
          TOOLS
        </h1>

        <button class="btn-primary btn" @click="ElectricCalculator">
          Electic Calculator
        </button>
        <div class="divider" />
        <div class="indicator">
          <RouterLink to="/tools/cannabis">
            <button class="btn-primary btn">
              Cannabis Calculator
            </button>
          </RouterLink>
        </div>
        <div class="indicator">
          <span class="indicator-item badge">new</span>
          <RouterLink to="/tools/mortgage">
            <button class="btn-primary btn">
              Mortgage Calculator
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
