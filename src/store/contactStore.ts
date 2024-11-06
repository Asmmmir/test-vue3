import { defineStore } from "pinia";
import { fetchContacts } from "../data/contacts";
import { Contact } from "../types/contact.type";

interface State {
  contacts: Contact[];
  filteredContacts: Contact[];
}

export const useContactStore = defineStore("contacts", {
  state: (): State => ({
    contacts: [],
    filteredContacts: [],
  }),
  actions: {
    async initializeContacts() {
      const savedContacts = localStorage.getItem("contacts");
      if (savedContacts) {
        this.contacts = JSON.parse(savedContacts);
        this.filteredContacts = this.contacts;
      } else {
        const data = await fetchContacts();
        this.contacts = data;
        this.filteredContacts = data;
        this.saveContactsToLocalStorage();
      }
    },
    
    saveContactsToLocalStorage() {
      localStorage.setItem("contacts", JSON.stringify(this.contacts));
    },

    async getAllContacts() {
      await this.initializeContacts();
    },

    addContact(contact: Contact) {
      this.contacts.push(contact);
      this.filteredContacts = this.contacts;
      this.saveContactsToLocalStorage();
    },

    deleteContact(contactId: number) {
      this.contacts = this.contacts.filter((contact) => contact.id !== contactId);
      this.filteredContacts = this.filteredContacts.filter(
        (contact) => contact.id !== contactId
      );
      this.saveContactsToLocalStorage();
    },

    editContact(updatedContact: Contact) {
      const index = this.contacts.findIndex((contact) => contact.id === updatedContact.id);
      if (index !== -1) {
        this.contacts[index] = updatedContact;
        this.filteredContacts = [...this.contacts];
        this.saveContactsToLocalStorage();
      }
    },

    filterContact(name: string) {
      if (name.trim()) {
        this.filteredContacts = this.contacts.filter((contact) =>
          contact.name.toLowerCase().includes(name.toLowerCase())
        );
      } else {
        this.filteredContacts = this.contacts;
      }
    },
  },
});
