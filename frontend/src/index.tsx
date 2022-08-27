import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './store/store';
import reportWebVitals from './reportWebVitals';
import Login from "./components/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NewPostForm from "./components/NewPostForm";
import Post from "./components/Post";
import Header from "./components/Header";
import Feed from "./components/Feed";

const container = document.getElementById('root')!;

const root = createRoot(container);

const GetToken = () => {
    const getCookie = (cName : string) => {
        const name = cName + "=";
        const cDecoded = decodeURIComponent(document.cookie); //to be careful
        const cArr = cDecoded.split('; ');
        let res;
        cArr.forEach(val => {
            if (val.indexOf(name) === 0) res = val.substring(name.length);
        })
        return res
    }
    return !!getCookie('lenyablog');
};

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Feed />} />
                    <Route path="/create" element={<NewPostForm />} />
                    <Route path="/post/:id" element={<Post/>}/>
                    <Route
                        path="*"
                        element={
                            <main className="container">
                                <h1>404</h1>
                                <h2>Страница не найдена!</h2>
                            </main>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

// ts auth routes components stores clean up
root.render(
    <Provider store={store}>
        { GetToken() ? App() : <Login /> }
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
