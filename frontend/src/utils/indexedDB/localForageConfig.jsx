// localForageConfig.js
import localForage from 'localforage';

localForage.config({
  driver: localForage.INDEXEDDB, // Force IndexedDB; it might use localStorage otherwise
  name: 'AfricanMarketDB',
  storeName: 'state', 
});

export default localForage;
