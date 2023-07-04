<script setup lang="ts">
import Avatar from "~/assets/avatar.jpg";

defineOptions({
  name: "LayoutFooter",
});
</script>

<template>
  <footer
    class="footer footer-center sticky bottom-0 border-t border-base-100 bg-base-200 px-4 pt-2 text-base-content opacity-90"
  >
    <div class="flex w-full max-w-6xl flex-row items-center justify-between gap-6">
      <a
        href="https://github.com/Kunihir0"
        target="_blank"
        rel="nofollow"
        class="inline-flex items-center justify-center hover:opacity-90"
      ><div class="avatar mr-3">
         <div class="mask mask-squircle h-14 w-14 bg-neutral p-px">
           <img
             width="54"
             height="54"
             :src="Avatar"
             alt="Lazy Turtle"
             class="mask mask-squircle"
           >
         </div>
       </div>
        <div class="text-left">
          <p class="text-xs text-base-content text-opacity-50">Created by</p>
          <h2 class="text-lg font-bold text-base-content">Lazy Turle</h2>
        </div>
      </a>
    </div>
  </footer>
</template>
