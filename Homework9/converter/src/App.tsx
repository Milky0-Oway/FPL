import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Header} from "./components/Header";
import {HomePage} from "./containers/HomePage";
import {ErrorPage} from "./containers/ErrorPage";
import {HistoryPage} from "./containers/HistoryPage";
import {AboutPage} from "./containers/AboutPage";
import {CurrencyInfoPage} from "./containers/CurrencyInfoPage";
import {ContextProvider} from "./context/ContextProvider";
import {Provider} from "react-redux";
import store from "./redux";

function App() {
  return (
      <ContextProvider>
          <Provider store={store}>
            <div className="App">
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route element={<HomePage/>} path='/'/>
                        <Route element={<HistoryPage/>} path='/history'/>
                        <Route element={<AboutPage/>} path='/about'/>
                        <Route path="/currency-info/:currencyId" element={<CurrencyInfoPage />} />
                        <Route element={<ErrorPage/>} path='/*'/>
                    </Routes>
                </BrowserRouter>
            </div>
          </Provider>
      </ContextProvider>
  );
}

export default App;
