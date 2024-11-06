<script setup lang="ts">
import { ref, watch } from 'vue';
import { useContactStore } from '../store/contactStore';

const searchQuery = ref<string>('')
const contactStore = useContactStore()


watch(searchQuery, (newQuery) => {
  contactStore.filterContact(newQuery);
});

</script>

<template>
  <div class="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm p-2 max-w-sm">
    <input
      type="text"
      placeholder="Поиск контактов..."
      v-model="searchQuery"
      class="w-full px-4 py-2 text-gray-700 placeholder-gray-400 rounded-md"
    />
  </div>
</template>
