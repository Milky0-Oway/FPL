import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Header} from "./components/Header";
import {HomePage} from "./containers/HomePage";
import {ErrorPage} from "./containers/ErrorPage";
import {HistoryPage} from "./containers/HistoryPage";
import {AboutPage} from "./containers/AboutPage";
import {ContextProvider} from "./context/ContextProvider";

function App() {
  return (
      <ContextProvider>
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route element={<HomePage/>} path='/'/>
                    <Route element={<HistoryPage/>} path='/history'/>
                    <Route element={<AboutPage/>} path='/about'/>
                    <Route element={<ErrorPage/>} path='/*'/>
                </Routes>
            </BrowserRouter>
        </div>
      </ContextProvider>
  );
}

export default App;
