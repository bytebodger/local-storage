import { is } from 'is';
import { temp } from 'temp';

export class local {
   /*
      a wrapper for localStorage() that will store every key value in a serialized JSON string
      this allows localStorage to hold string, booleans, numbers, nulls, objects, and arrays
      if localStorage() is not available, it will use a standard object for storage
    */
   static clear = () => {
      if (this.localStorageIsSupported())
         localStorage.clear();
      // noinspection JSUndeclaredVariable
      temp = {};
   };
   
   static getItem = (itemName = '', defaultValue = '__noDefaultValueSupplied__') => {
      if (!is.aPopulatedString(itemName))
         return null;
      if (this.localStorageIsSupported()) {
         const valueObject = JSON.parse(localStorage.getItem(itemName));
         if (valueObject === null && defaultValue !== '__noDefaultValueSupplied__') {
            this.setItem(itemName, defaultValue);
            return defaultValue;
         }
         if (valueObject.hasOwnProperty('value')) {
            if (valueObject.value === null && defaultValue !== '__noDefaultValueSupplied__') {
               this.setItem(itemName, defaultValue);
               return defaultValue;
            }
         }
         return valueObject.value;
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
   
   static localStorageIsSupported = () => {
      try {
         const testKey = '__some_random_key_you_are_not_going_to_use__';
         localStorage.setItem(testKey, testKey);
         localStorage.removeItem(testKey);
         return true;
      } catch (e) {
         return false;
      }
   };
   
   static removeItem = (itemName = '') => {
      if (!is.aPopulatedString(itemName))
         return false;
      if (this.localStorageIsSupported())
         localStorage.removeItem(itemName);
      else if (temp.hasOwnProperty(itemName))
         delete temp[itemName];
      return true;
   };
   
   static setItem = (itemName, itemValue) => {
      if (is.undefined(itemValue) || !is.aPopulatedString(itemName))
         return false;
      if (this.localStorageIsSupported()) {
         const valueToBeSerialized = {value : itemValue};
         const serializedValue = JSON.stringify(valueToBeSerialized);
         localStorage.setItem(itemName, serializedValue);
      } else {
         temp[itemName] = itemValue;
      }
      return true;
   };
}
