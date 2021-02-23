import { local } from './local';

const aDecimal = 3.14;
const aFalse = false;
const aFalseString = 'false';
const anEmptyArray = [];
const anEmptyObject = {};
const anEmptyString = '';
const anInteger = 42;
const aNull = null;
const aPopulatedArray = ['one', 2, 3.14, {four: 4}];
const aPopulatedObject = {one: 'uno', two: 2, pi: 3.14, numbers: [1, 3, 3]};
const aString = 'foo dawg';
const aTrue = true;
const aTrueString = 'true';

// clear()

test('clear() should leave no values in localStorage', () => {
   local.setItem('aPopulatedObject', aPopulatedObject);
   local.setItem('aNull', aNull);
   local.setItem('aString', aString);
   local.clear();
   expect(JSON.stringify(localStorage)).toEqual('{}');
});

// getItem()

test(`getItem() should return a NULL if the itemName doesn't exist`, () => {
   expect(local.getItem('foo')).toEqual(null);
});

test(`getItem() should use defaultValue if the itemName doesn't exist`, () => {
   local.getItem('foo', 'bar');
   expect(local.getItem('foo')).toEqual('bar');
   local.clear();
});

// getItem() & setItem()

test('getItem() should return the proper data type for stored items', () => {
   local.setItem('aDecimal', aDecimal);
   local.setItem('aFalse', aFalse);
   local.setItem('aFalseString', aFalseString);
   local.setItem('anEmptyArray', anEmptyArray);
   local.setItem('anEmptyObject', anEmptyObject);
   local.setItem('anEmptyString', anEmptyString);
   local.setItem('anInteger', anInteger);
   local.setItem('aNull', aNull);
   local.setItem('aPopulatedArray', aPopulatedArray);
   local.setItem('aPopulatedObject', aPopulatedObject);
   local.setItem('aString', aString);
   local.setItem('aTrue', aTrue);
   local.setItem('aTrueString', aTrueString);
   expect(local.getItem('aDecimal')).toEqual(aDecimal);
   expect(local.getItem('aFalse')).toEqual(aFalse);
   expect(local.getItem('aFalseString')).toEqual(aFalseString);
   expect(local.getItem('anEmptyArray')).toEqual(anEmptyArray);
   expect(local.getItem('anEmptyObject')).toEqual(anEmptyObject);
   expect(local.getItem('anEmptyString')).toEqual(anEmptyString);
   expect(local.getItem('anInteger')).toEqual(anInteger);
   expect(local.getItem('aNull')).toEqual(aNull);
   expect(local.getItem('aPopulatedArray')).toEqual(aPopulatedArray);
   expect(local.getItem('aPopulatedObject')).toEqual(aPopulatedObject);
   expect(local.getItem('aString')).toEqual(aString);
   expect(local.getItem('aTrue')).toEqual(aTrue);
   expect(local.getItem('aTrueString')).toEqual(aTrueString);
   local.clear();
});

// removeItem()

test('removeItem() should remove the item', () => {
   local.setItem('aDecimal', aDecimal);
   local.removeItem('aDecimal');
   expect(local.getItem('aDecimal')).toEqual(null);
   local.clear();
});
