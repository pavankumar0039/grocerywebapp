import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './Redux/Userstore'; // Fixed path
import { PersistGate } from 'redux-persist/integration/react';

// Create the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app with Redux and Persist
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// Performance measurement (optional)
reportWebVitals();
