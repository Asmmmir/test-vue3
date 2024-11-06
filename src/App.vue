<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import ContactList from "./components/ContactList.vue";
import SearchBar from "./components/SearchBar.vue";
import { useContactStore } from "./store/contactStore";
import AddForm from "./components/AddForm.vue";

const contactStore = useContactStore();
const isAddingContact = ref<boolean>(false);

const toggleAddContact = () => {
  isAddingContact.value = !isAddingContact.value;
};

onMounted(() => {
  contactStore.getAllContacts();
});
</script>

<template>
  <div class="flex flex-col items-center mt-4">
    <div class="flex gap-4">
      <SearchBar />
      <button
        @click="toggleAddContact"
        class="bg-green-400 p-3 rounded-md"
      >
        Добавить контакт
      </button>
    </div>
    <ContactList />
    <AddForm @close="toggleAddContact" v-if="isAddingContact" />
  </div>
</template>
