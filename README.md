# local-storage

This is a small utility class for storing and retrieving complex values from localStorage. By default, localStorage only saves strings. But by using `JSON.stringify()` and `JSON.parse()`, we can save objects, arrays, nulls, Booleans, numbers, and strings. And when using the `getItem()` method, it will retrieve those values in their native type.

This package also fails gracefully (and silently) in those instances where _there is no localStorage available_ in the client. One example where this can happen is when a user's browser is in Incognito Mode. In such cases, this package will use a simple local object to store the values temporarily. This will provide some semblance of localStorage-like behavior, even if those values will not be present in the next session.

Due to the limitations of `JSON.stringify()` and `JSON.parse()`, the integrity of retrieved values cannot be maintained for certain complex values. Specifically, _functions_ will not survive the `JSON.stringify()/JSON.parse()` process.

## Usage

```javascript
import { local } from '@toolz/local-storage';

local.setItem('theAnswer', 42); // sets the value 42 in localStorage
local.getItem('theAnswer'); // returns the number 42
```

## Methods

### .clear()

`.clear()` empties all values from localStorage.

```javascript
const API = {
   arguments: {},
   returns: void,
}
```

**Examples:**

```javascript
local.setItem('one', 1);
local.setItem('two', 2);

local.clear();

local.getItem('one'); // returns NULL
local.getItem('two', 22); // return 22
```

### .getItem()

`.getItem()` retrieves an item from localStorage in its native data type. If it doesn't exist and no default value is provided, it returns `NULL`. If a default value is provided and the item doesn't exist, it sets the default value as the item and returns that value.

```javascript
const API = {
   arguments: {
      itemName: {
         required,
         format: 'populated string',
      },
      defaultValue: {
         optional,
         format: any,
      },
   },
   returns: any,
}
```

**Examples:**

```javascript
local.setItem('foo', [1, 2, 3]);
local.setItem('firstName', 'Joe');
local.setItem('address', {street: '101 Main', city: 'fooville'});

local.getItem('foo'); // returns [1, 2, 3]
local.getItem('firstName'); // returns 'Joe'
local.getItem('address'); // returns {street: '101 Main', city: 'fooville'}
local.getItem('notSet'); // returns NULL
local.getItem('anotherNotSet', 3.14); // returns 3.14
```

### .removeItem()

`.removeItem()` unsets an item from localStorage. If the item didn't previously exist, the method throws no error.

```javascript
const API = {
   arguments: {
      itemName: {
         required,
         format: 'populated string',
      },
   },
   returns: true,
}
```

**Examples:**

```javascript
local.setItem('foo', [1, 2, 3]);
local.setItem('firstName', 'Joe');

local.removeItem('foo');
local.removeItem('firstName');

local.getItem('foo'); // returns NULL
local.getItem('firstName', 'Mary'); // return 'Mary'
```

### .setItem()

`.setItem()` sets an item into localStorage. If the item already existed, it will overwrite the previous one. If the item did not exist, it will create a new item.

```javascript
const API = {
   arguments: {
      itemName: {
         required,
         format: 'populated string',
      },
      itemValue: {
         optional,
         format: any,
      },
   },
   returns: any,
}
```

**Examples:**

```javascript
local.setItem('foo', [1, 2, 3]);
local.setItem('firstName', 'Joe');

local.getItem('foo'); // returns [1, 2, 3]
local.getItem('firstName', 'Mary'); // return 'Joe'
```
