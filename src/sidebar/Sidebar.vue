<script setup lang="ts">
import Tabs from './Tabs.vue'

// export default {
//   data: {
//     tabs ["extension://introduction.html", "https://zequez.notion.site/Gameworld-Browser-9be11d611739497dab53e1dfbcb069fd", "https://github.com/Zequez/gameworld-browser"]
//   },
//   mounted() {
//     console.log("Component mounted");
//   }
// }

</script>

<template>
  <main class="text-center text-gray-700">
    <div class="aspect-h-0.62">
      <img src="/assets/banners/gameworld-browser.png" class="w-full " />
    </div>
    <Suspense>
      <Tabs />
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </main>
</template>
