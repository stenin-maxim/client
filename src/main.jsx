import React from 'react'
import { createRoot } from 'react-dom/client'
// import { BrowserRouter} from 'react-router'
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)
