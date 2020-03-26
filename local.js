import is from './is';
import {temp} from './temp';

class localStorageWrapper {
   /*
      a wrapper for localStorage() that will store every key value in a serialized JSON string
      this allows localStorage to hold string, booleans, numbers, nulls, objects, and arrays
      if localStorage() is not available, it will use a standard object for storage
    */
   clear = () => {
      if (this.localStorageIsSupported())
         localStorage.clear();
      temp = {};
   };
   
   getItem = (itemName = '') => {
      if (!is.aPopulatedString(itemName))
         return null;
      if (this.localStorageIsSupported()) {
         const valueToBeDeserialized = localStorage.getItem(itemName);
         if (!valueToBeDeserialized)
            return null;
         const deserializedValue = JSON.parse(valueToBeDeserialized);
         if (deserializedValue.hasOwnProperty('value'))
            return deserializedValue.value;
         return null;
      } else {
         if (temp.hasOwnProperty(itemName))
            return temp[itemName];
         return null;
      }
   };
   
   localStorageIsSupported = () => {
      try {
         const testKey = '__some_random_key_you_are_not_going_to_use__';
         localStorage.setItem(testKey, testKey);
         localStorage.removeItem(testKey);
         return true;
      } catch (e) {
         return false;
      }
   };
   
   removeItem = (itemName = '') => {
      if (!is.aPopulatedString(itemName))
         return false;
      if (this.localStorageIsSupported())
         localStorage.removeItem(itemName);
      else if (temp.hasOwnProperty(itemName))
         delete temp[itemName];
      return true;
   };
   
   setDefault = (itemName = '', defaultValue = '') => {
      if (!is.aPopulatedString(itemName) || is.undefined(defaultValue))
         return null;
      let currentValue;
      if (this.localStorageIsSupported()) {
         currentValue = this.getItem(itemName);
         if (!is.nullOrUndefined(currentValue) && (currentValue !== '' || currentValue === defaultValue))
            return this.getItem(itemName);
      } else {
         currentValue = temp[itemName];
         if (!is.nullOrUndefined(currentValue) && (currentValue !== '' || currentValue === defaultValue))
            return temp[itemName];
      }
      this.setItem(itemName, defaultValue);
      return defaultValue;
   };
   
   setItem = (itemName, itemValue) => {
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

const local = new localStorageWrapper();
export default local;
