<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useContactStore } from '../store/contactStore';
import ContactItem from './ContactItem.vue';

const contactStore = useContactStore()
const {filteredContacts} = storeToRefs(contactStore)

</script>

<template>
    <div class="container mx-auto mt-4">
        <div v-for="contact in filteredContacts ">
            <ContactItem :contact="contact" />
        </div>
    </div>
</template>