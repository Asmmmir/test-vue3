<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { useContactStore } from "../store/contactStore";

const contactStore = useContactStore();

const contactState = reactive({
  id: new Date().getMilliseconds(),
  name: "",
  phone: "",
  email: "",
});

const errors = reactive({
  name: "",
  phone: "",
  email: ""
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

const validateForm = () => {
  let isValid = true;
  errors.name = contactState.name ? "" : "Имя обязательно";
  errors.phone = contactState.phone ? "" : "Телефон обязателен";
  errors.email = contactState.email
    ? /\S+@\S+\.\S+/.test(contactState.email)
      ? ""
      : "Некорректный формат почты"
    : "Почта обязательна";

  if (errors.name || errors.phone || errors.email) {
    isValid = false;
  }

  return isValid;
};

const handleSubmit = () => {
  if (validateForm()) {
    contactStore.addContact(contactState);
    closeModal(); 
  }
};

</script>

<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
  >
    <div
      class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative animate-fadeIn"
    >
      <button @click="closeModal" class="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
        ✕
      </button>

      <h2 class="text-xl font-semibold mb-4">Заголовок модального окна</h2>

      <form @submit.prevent="handleSubmit" class="flex flex-col bg-white p-6 rounded-lg max-w-md mx-auto space-y-4">
        <label for="name" class="text-sm font-medium text-gray-700">
          Имя
          <input
            class="border-2 rounded-md p-2 w-full mt-1 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            :class="{'border-red-500': errors.name}"
            id="name"
            type="text"
            placeholder="Введите имя"
            v-model="contactState.name"

          />
          <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
        </label>

        <label for="email" class="text-sm font-medium text-gray-700">
          Почта
          <input
            class="border-2 rounded-md p-2 w-full mt-1 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            :class="{'border-red-500': errors.email}"
            id="email"
            type="email"
            placeholder="Введите почту"
            v-model="contactState.email"
          />
          <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
        </label>

        <label for="phone" class="text-sm font-medium text-gray-700">
          Телефон
          <input
            class="border-2 rounded-md p-2 w-full mt-1 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            :class="{'border-red-500': errors.phone}"
            id="phone"
            type="tel"
            placeholder="Введите телефон"
            v-model="contactState.phone"
          />
          <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</p>
        </label>

        <div class="flex justify-end space-x-4">
          <button
            @click="closeModal"
            type="button"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Отмена
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Подтвердить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
