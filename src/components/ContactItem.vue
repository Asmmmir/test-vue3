<script setup lang="ts">
import { ref } from "vue";
import { useContactStore } from "../store/contactStore";

const contactStore = useContactStore();

const isEdit = ref<boolean>(false);

const contactToEdit = ref({
  id: 0,
  name: "",
  email: "",
  phone: "",
});

const props = defineProps<{
  contact: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
}>();

const openEditModal = () => {
  contactToEdit.value = { ...props.contact };  
  isEdit.value = true;
};

const closeEditModal = () => {
  isEdit.value = false;
};


const validateForm = () => {
  if (!contactToEdit.value.name || !contactToEdit.value.email || !contactToEdit.value.phone) {
    return false;
  }
  return true;
};

const saveChanges = () => {
  if (validateForm()) {
    contactStore.editContact(contactToEdit.value);
    closeEditModal();
  } else {
    alert("Пожалуйста, заполните все поля!");
  }
};
</script>

<template>
  <div class="border-2 flex justify-between p-4">
    <div>
      <p>{{ props.contact.name }}</p>
    </div>
    <div>
      <p>{{ props.contact.phone }}</p>
    </div>
    <div>
      <p>{{ props.contact.email }}</p>
    </div>
    <div class="flex gap-4">
      <button @click="openEditModal" class="rounded-md bg-blue-500 p-2">
        Edit
      </button>
      <button
        @click="contactStore.deleteContact(props.contact.id)"
        class="rounded-md bg-red-500 p-2"
      >
        Delete
      </button>
    </div>
  </div>

  <!-- Модалка для редактирования -->
  <div
    v-if="isEdit"
    class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
  >
    <div
      class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative animate-fadeIn"
    >
      <button
        @click="closeEditModal"
        class="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>

      <h2 class="text-xl font-semibold mb-4">Редактировать контакт</h2>

      <form class="flex flex-col space-y-4">
        <!-- Имя -->
        <label for="name" class="text-sm font-medium text-gray-700">
          Имя
          <input
            v-model="contactToEdit.name"
            id="name"
            type="text"
            placeholder="Введите имя"
            class="border-2 border-gray-300 rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <!-- Почта -->
        <label for="email" class="text-sm font-medium text-gray-700">
          Почта
          <input
            v-model="contactToEdit.email"
            id="email"
            type="email"
            placeholder="Введите почту"
            class="border-2 border-gray-300 rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <!-- Телефон -->
        <label for="phone" class="text-sm font-medium text-gray-700">
          Телефон
          <input
            v-model="contactToEdit.phone"
            id="phone"
            type="tel"
            placeholder="Введите телефон"
            class="border-2 border-gray-300 rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </form>

      <div class="flex justify-end space-x-4">
        <button
          @click="closeEditModal"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Отмена
        </button>
        <button
          @click="saveChanges"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Подтвердить
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>
