import { allow } from '@toolz/allow';
import { localStorageIsAvailable } from '@toolz/local-storage-is-available';

let temp = {};

const Local = () => {
   allow.setFailureBehavior(allow.failureBehavior.WARN);
   
   const clear = () => {
      if (localStorageIsAvailable())
         localStorage.clear();
      temp = {};
   };
   
   const getItem = (itemName = '', defaultValue = '__noDefaultValueSupplied__') => {
      allow.aString(itemName, is.not.empty);
      if (localStorageIsAvailable()) {
         const valueObject = JSON.parse(localStorage.getItem(itemName));
         if (valueObject === null) {
            if (defaultValue !== '__noDefaultValueSupplied__') {
               setItem(itemName, defaultValue);
               return defaultValue;
            }
            return null;
         }
         if (valueObject.hasOwnProperty('value')) {
            if (valueObject.value === null && defaultValue !== '__noDefaultValueSupplied__') {
               setItem(itemName, defaultValue);
               return defaultValue;
            }
            return valueObject.value;
         }
         return null;
      } else {
         if (temp.hasOwnProperty(itemName))
            return temp[itemName];
         else if (defaultValue !== '__noDefaultValueSupplied__') {
            temp[itemName] = defaultValue;
            return defaultValue;
         }
         return null;
      }
   };
   
   const is = {not: {empty: 1}};

   const removeItem = (itemName = '') => {
      allow.aString(itemName, is.not.empty);
      if (localStorageIsAvailable())
         localStorage.removeItem(itemName);
      else if (temp.hasOwnProperty(itemName))
         delete temp[itemName];
      return true;
   };
   
   const setItem = (itemName = '', itemValue) => {
      allow.aString(itemName, is.not.empty);
      if (localStorageIsAvailable()) {
         const valueToBeSerialized = {value: itemValue};
         const serializedValue = JSON.stringify(valueToBeSerialized);
         localStorage.setItem(itemName, serializedValue);
      } else {
         temp[itemName] = itemValue;
      }
      return itemValue;
   };
   
   return {
      clear,
      getItem,
      removeItem,
      setItem,
   };
};

export const local = Local();
