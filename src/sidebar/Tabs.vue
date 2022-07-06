<script setup lang="ts">
import { ref } from 'vue';

let tabs = ref(await fetchTabs());

async function fetchTabs() {
  return await (browser.tabs.query({ currentWindow: true }));
}

function switchToTab(tabId: number) {
  console.log("Switching to", tabId);
  browser.tabs.update(tabId, { active: true });
}

function closeTab(tabId: number) {
  console.log("Closing", tabId);
  browser.tabs.remove(tabId);
}

browser.tabs.onActivated.addListener(({ tabId }) => {
  console.log("Tab activated", tabId);
  const index = tabs.value.findIndex(tab => tab.id === tabId);
  tabs.value[index].active = true;
  tabs.value.forEach((t) => { if (t.id !== tabId) t.active = false });
});

browser.tabs.onUpdated.addListener(async (tab) => {
  console.log("On updated event");
  tabs.value = await fetchTabs();
})

browser.tabs.onCreated.addListener(async (tab) => {
  console.log("On Created event");
  tabs.value.splice(tab.index, 0, tab);
})

browser.tabs.onRemoved.addListener(async (tabId) => {
  const index = tabs.value.findIndex(tab => tab.id === tabId);
  const tab = tabs.value.splice(index, 1);
  console.log("Removed tab: ", tab);
})

</script>

<template>
  <div>
    <div v-for="tab in tabs" class="border-b first:border-y border-solid border-gray-300">
      <div @click.middle="closeTab(tab.id || 0)" @click.left="switchToTab(tab.id || 0)"
        :class="{ 'bg-gray-200': tab.active }" class="block text-gray-700 hover:bg-gray-300">
        <div class="flex items-center">
          <div class="flex-0 p-1">
            <img :src="tab.favIconUrl" class="w-6 h-6 rounded-full" />
          </div>
          <div class="flex-grow">
            <div class="text-sm text-center">{{ tab.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
