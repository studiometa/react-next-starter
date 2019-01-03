# Store

This starter uses react-redux and redux-thunk libraries to manage the store and provide a context across the pages.


## Isomorphism

The store is `isomorphic`. This means that it works on both the server and client sides. To do this, it is initialized a first time on the server side. It is then possible to update or consume it using actions and providers. 

Once the page is served on the client side, the content of the store is stored in a global variable attached to the `window` object. This allows a new store to be initialized on the client side while keeping the data from the server store.


## The folder /blind
  
Reducers and actions are separated in different folders. The actions/reducers of each state are also defined in a separate file.  
  
### /store/createStore.js  
  
Returns a function to **create a new store**.  
  
### /store/actions  
  
Contains all the **actions of the application**. The actions of each substore are defined in a separate file using the following nomenclature: `<store>.actions.js`.  
  
If you open one of these files, you will notice that each action is an **exported function**. You will also notice that the **constant** of the name of each action is **also exported**.  
  
These are used by reducers to ensure that the name of the corresponding action is always good (since it is defined in only one place).  
  
### /store/reducers  
  
In the same way, this folder contains the **reducers of the app**.  
Be careful, contrary to the actions, if you want to add a new reducer, you will also have to export it in the file `/store/reducers/index.js`


## Asynchronous actions

The redux-thunk library is used to allow certain actions to be performed asynchronously. This is very useful when it comes to performing certain tasks such as requesting an API and when the recovered data must be stored in the store. 


### Demonstration with the fetchAppSettings action

**Go to the file `/store/actions.app.actions.js` and take a look at the action `fetchAppSettings`: **

- Each asynchronous action returns a new function called "async".
	- This function takes three parameters:
		- **dispatch** : native function to redux allowing to call another action
		- **getState** : native to redux function to return the current store.
		- socket** : instance of the socket class that simplifies communication with a possible remote API
- A little tip: it is possible to pass a callback as a parameter to the action. This allows you to perform an action based on the success or failure of the action to be performed without having to wait for the store to be updated.


## Local storage

Sometimes it may be useful to synchronize some elements of the store with the local storage. 

You can define these elements in the configuration file `/config/redux.config.js` using the parameter `localStorageStates`. This is a table that is supposed to contain the identification of the elements to be stored in the local storage. For example: 'app', 'user.preferences', etc.

Note that the "client" store is constantly hydrated from the "server" store each time the page is loaded again. Be careful to store only elements that will not be constantly refreshed
