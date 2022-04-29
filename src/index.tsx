import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider, createStore } from 'easy-peasy';
import { UserContext } from './context';
import { CookiesProvider } from 'react-cookie';
// import { createTheme, Theme, ThemeProvider } from '@mui/system';

// declare module '@mui/material/styles' {
//   interface BreakpointOverrides {
//     xs: false; // removes the `xs` breakpoint
//     sm: false;
//     md: false;
//     lg: false;
//     xl: false;
//     mobile: true; // adds the `mobile` breakpoint
//     tablet: true;
//     laptop: true;
//     desktop: true;
//   }
// }
// const theme: Theme = createTheme();

// interface StoreModel {
//   todos: string[];
// }

// const store = createStore<StoreModel>({
//   todos: []
// });

// const mystore = {
//   store: store
// }

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* <ThemeProvider theme={theme}> */}
      <BrowserRouter>
      {/* <StoreProvider store={mystore.store} key={'123'}> */}
      <UserContext.Provider value={{user: null}}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </UserContext.Provider>
      {/* </StoreProvider> */}
      </BrowserRouter>
    {/* </ThemeProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
