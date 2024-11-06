import { Contact } from "../types/contact.type";

  export const fetchContacts = (): Promise<Contact[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'Aslan', email: 'aslan@gmail.com', phone:'+79031112233' },
          { id: 2, name: 'Ivan', email: 'ivan@gmail.com', phone:'+79024353454' },
          { id: 3, name: 'Andrey', email: 'andrey@gmail.com', phone:'+79037644324' },
          { id: 4, name: 'Luba', email: 'luba@gmail.com', phone:'+79064453453' },
        ]);
      }, 1000);
    });
  };
  