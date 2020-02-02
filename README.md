# Local Storage Wrapper

This is a small utility class for storing and retrieving complex values from LocalStorage.  By default, LocalStorage only saves strings.  But by using `JSON.stringify()` and `JSON.parse()`, we can save objects, array, Booleans, numbers, and strings.  And when using the `getItem()` method from this class, it will retrieve those values in their native type.


## Usage

This example is shown in React - but the same could be done in "regular" JavaScript:

    import local from './local';
    import React from 'react';
    
    export default class Foo extends React.Component {
       constructor(props) {
          super(props);
          this.username = local.setDefault('username', 'NONE');  // this will get the current value - or set a default value if the key does not yet exist in LocalStorage
          this.pageViews = 0;
          local.setItem('pageViews', pageViews);
       }
    
       render() {
          let latestPageViews = local.getItem('pageViews');
          local.setItem('pageViews', latestPageViews + 1);
          return (
             <div>
                username: {this.username}
                <br />
                pageViews: {local.getItem('pageViews')}
             </div>
          );
       }
    }
