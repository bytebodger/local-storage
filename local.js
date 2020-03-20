import is from './is';

class local {
   /*
      a wrapper for localStorage() that will store every key value in a serialized JSON string
      this allows localStorage to hold string, booleans, numbers, nulls, objects, and arrays
    */
   clear = () => {
      localStorage.clear();
   };   
   
   getItem = (itemName = '') => {
      if (!is.aPopulatedString(itemName))
         return null;
      const valueToBeDeserialized = localStorage.getItem(itemName);
      if (!valueToBeDeserialized)
         return null;
      const deserializedValue = JSON.parse(valueToBeDeserialized);
      if (deserializedValue.hasOwnProperty('value'))
         return deserializedValue.value;
      return null;
   };
   
   removeItem = (itemName = '') => {
      if (!is.aPopulatedString(itemName))
         return false;
      localStorage.removeItem(itemName);
      return true;
   };
   
   setDefault = (itemName = '', defaultValue = '') => {
      if (!is.aPopulatedString(itemName) || defaultValue === undefined)
         return null;
      const currentValue = this.getItem(itemName);
      if (!is.nullOrUndefined(currentValue) && (currentValue !== '' || currentValue === defaultValue))
         return this.getItem(itemName);
      this.setItem(itemName, defaultValue);
      return defaultValue;
   };
   
   setItem = (itemName, itemValue) => {
      if (is.undefined(itemValue) || !is.aPopulatedString(itemName))
         return false;
      const valueToBeSerialized = {value : itemValue};
      const serializedValue = JSON.stringify(valueToBeSerialized);
      localStorage.setItem(itemName, serializedValue);
      return true;
   };
}

const db = new local();
export default db;
