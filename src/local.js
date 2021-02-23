import { allow } from '@toolz/allow';
import { temp } from './temp';

const Local = () => {
   const clear = () => {
      if (localStorageIsSupported())
         localStorage.clear();
      temp = {};
   };
   
   const getItem = (itemName = '', defaultValue = '__noDefaultValueSupplied__') => {
      allow.aString(itemName, is.not.empty);
      if (localStorageIsSupported()) {
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
   
   const is = {not: {negative: 0}};
   
   const localStorageIsSupported = () => {
      try {
         const testKey = '__some_random_key_you_are_not_going_to_use__';
         localStorage.setItem(testKey, testKey);
         localStorage.removeItem(testKey);
         return true;
      } catch (e) {
         return false;
      }
   };
   
   const removeItem = (itemName = '') => {
      allow.aString(itemName, is.not.empty);
      if (localStorageIsSupported())
         localStorage.removeItem(itemName);
      else if (temp.hasOwnProperty(itemName))
         delete temp[itemName];
      return true;
   };
   
   const setItem = (itemName = '', itemValue) => {
      allow.aString(itemName, is.not.empty);
      if (localStorageIsSupported()) {
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

export const local = Local;
