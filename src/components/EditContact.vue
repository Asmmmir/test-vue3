<script setup lang="ts">
import { ref } from 'vue';


</script>

<template>
<div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">

  <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative animate-fadeIn">

    <button class="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
      ✕
    </button>


    <h2 class="text-xl font-semibold mb-4">Заголовок модального окна</h2>

    <p class="text-gray-600 mb-6">
      Здесь можно разместить любой текст или форму для взаимодействия с пользователем. Например, форма редактирования данных.
    </p>

    <div class="flex justify-end space-x-4">
      <button  class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
        Отмена
      </button>
      <button  class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Подтвердить
      </button>
    </div>

  </div>
</div>
</template>