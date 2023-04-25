import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('Jate database exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('Jate database created');
    },
  });

  export const putDb = async (content)  => {
    console.log('Put to database');
  
    const contactDb = await openDB('jate', 1);

    const tx = contactDb.transaction('jate', 'readwrite');
  
    const store = tx.objectStore('jate');

    const request = store.put({ id: 1, value: content });

    const result = await request;
    console.log('Data saved', result);
  };
  
  export const getDb = async () => {
    console.log('Get from database');
  
    const contactDb = await openDB('jate', 1);

    const tx = contactDb.transaction('jate', 'readonly');
  
    const store = tx.objectStore('jate');
 
    const request = store.getAll();

    const result = await request;
    console.log('result.value', result);
    return result?.value;
  };
  
  
  initdb();